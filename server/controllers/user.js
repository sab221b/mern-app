const mongoose = require('mongoose');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');
const { encryptPassword, comparePassword } = require('../middleware/password');
const { userSignup, userLogin, userUpdate } = require('../validations/user');
const { mongoStore } = require('../mongoStore');

exports.getUsers = async (req, res, next) => {
  try {
    let users = await User.find(req.query).select('-password').populate('profile');
    users = users.map(item => {
      const { password, ...userObj } = item._doc;
      return userObj;
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(400).send(error);
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('profile');
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { error } = await userLogin.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message })
    }
    const query = {
      $or: [
        { email: req.body.email },
        { phone: req.body.phone },
      ]
    };
    const user = await User.findOne(query);
    if (user) {
      const passwordMatch = await comparePassword(req.body.password, user.password);
      if (passwordMatch) {
        const loginUser = await User.findByIdAndUpdate(user._id, {
          lastLoginAt: new Date().toISOString(),
        }, { new: true }).populate('profile').populate('role');
        res.user = loginUser;
        req.session.user_id = loginUser._id;
        res.set('Session-Id', req.session.id);
        res.setHeader('Access-Control-Expose-Headers', 'Session-Id')
        next();
      } else {
        return res.status(401).send({ message: "Invalid credentials" })
      }
    } else {
      return res.status(404).send({ message: "User not found, please signup" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.logout = async (req, res) => {
  try {
    await mongoStore.destroy(req.headers.session_id); // Assuming this method exists in connect-mongo
    await mongoStore.destroy(req.session.id);
    res.status(200).send({ message: "User logged out" });
  } catch (error) {
    console.error("Error destroying session:", error);
    res.status(400).send(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let { error } = userUpdate.validate(req.body);
    if (error) {
      console.error(error);
      return res.status(400).json(error);
    }
    const user = await User.findById(req.session.user_id).select('-password').populate('profile');
    const profileId = user.profile._id;
    await Profile.findByIdAndUpdate(profileId, req.body.profile, { new: true });
    updatedUser = await User.findById(req.session.user_id).select('-password').populate('profile');
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.createUser = async (req, res, next) => {
  let { error } = userSignup.validate(req.body);
  if (error) {
    console.error(error);
    return res.status(400).json(error);
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: `user with ${req.body.email} already exists!` })
    }
    const profile = new Profile(req.body.profile);
    const savedProfile = await profile.save();
    const hash = await encryptPassword(req.body.password);
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.phone = req.body.phone;
    newUser.password = hash;
    newUser.profile = savedProfile._id;
    newUser.createdAt = new Date().toISOString();
    const savedUser = await newUser.save();
    res.user = await savedUser.populate('profile');
    req.session.user_id = savedUser._id;
    res.set('Session-Id', req.session.id);
    res.setHeader('Access-Control-Expose-Headers', 'Session-Id')
    next();
  } catch (error) {
    return res.send(error);
  }
}
