var createError = require("http-errors");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const sessionDestroy = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("errored logging out", err);
      res.status(400).send(err);
    }
    return res.status(401).send({ message: "User logged out" });
  });
};

const getSession = async (req, res) => {
  return new Promise((resolve, reject) => {
    req.sessionStore.get(req.headers.session_id, (error, session) => {
      if (error) {
        // Handle error
        console.error("Error retrieving session:", error);
        reject(error);
      }
      if (!session) {
        // Session not found
        reject(new Error("Session not found"));
      }
      // Session found
      if (session) {
        req.session.user_id = session.user_id;
        resolve(session);
      }
    });
  });
};

module.exports = {
  getUserBySession: async (req, res, next) => {
    if (req.session.user_id || req.headers.session_id) {
      try {
        if (req.session.user_id) {
          const user = await User.findById(req.session.user_id).select('-password').populate('profile').populate('role');
          if (user && user._id) res.status(200).send(user);
        } else if (req.headers.session_id) {
          const session = await getSession(req, res);
          const user = session && await User.findById(session.user_id).select('-password').populate('profile').populate('role');
          if (user && user._id) res.status(200).send(user);
        } else sessionDestroy(req, res);
      } catch (error) {
        sessionDestroy(req, res);
      }
    } else {
      sessionDestroy(req, res);
    }
  },

  checkUserSession: async (req, res, next) => {
    if (req.session.user_id || req.headers.session_id) {
      try {
        if (req.session.user_id) {
          const user = await User.findById(req.session.user_id);
          if (user && user._id) next();
        } else if (req.headers.session_id) {
          const session = await getSession(req, res);
          const user = session && await User.findById(session.user_id);
          if (user && user._id) next();
          else sessionDestroy(req, res);
        } else sessionDestroy(req, res);
      } catch (error) {
        sessionDestroy(req, res);
      }
    } else {
      sessionDestroy(req, res);
    }
  },

  checkAdminRole: (req, res, next) => {
    if (req.session.user_id && (req.session.role_id == 1 || req.session.role_id == 2))
      next();
    else
      next(createError(403));
  },

  allowLogin: (req, res, next) => {
    if (req.session.user_id)
      res.redirect('/');
    else
      next();
  },

  sessionLogout: (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      next()
    });
  }
}
