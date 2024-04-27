var createError = require('http-errors');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    checkUserSession: async (req, res, next) => {
        if (req.session.id && req.session.user_id) {
            try {
                const user = await User.findById(req.session.user_id);
                user && user._id && next();
            } catch (error) {
                res.redirect('/api/user/logout');
            }
        }
        else
            res.redirect('/api/user/logout');
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