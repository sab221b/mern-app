var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/user");
const roleCtrl = require("../controllers/role");
const featureCtrl = require("../controllers/feature");
const { hidePassword } = require("../middleware/password");
const { checkUserSession, getUserBySession } = require("../middleware/interceptor");

/* GET api. */
router.get("/", (req, res, next) => {
    res.render("error", { message: "Access Restricted", error: { status: 403, stack: 'Forbidden' } });
});

/* User Router */
router.get("/users", checkUserSession, userCtrl.getUsers);
router.post("/user/login", userCtrl.login, hidePassword);
router.post("/user/signup", userCtrl.createUser, hidePassword);
router.get("/user/self", getUserBySession, hidePassword);
router.get("/user/logout", userCtrl.logout);
router.post("/user/profile", checkUserSession, userCtrl.updateProfile);
router.post("/user/:id", checkUserSession, userCtrl.updateUser);
router.get("/user/:id", checkUserSession, userCtrl.getUserById);

/* Role Router */
router.get("/roles", checkUserSession, roleCtrl.getRoles);
router.post("/roles/create", checkUserSession, roleCtrl.createRole);
router.get("/roles/:id", checkUserSession, roleCtrl.getRoleById);
router.post("/roles/:id", checkUserSession, roleCtrl.updateRole);

/* Features Router */
router.get("/features", checkUserSession, featureCtrl.getFeatures);
router.post("/features/create", checkUserSession, featureCtrl.createFeature);
router.get("/features/:id", checkUserSession, featureCtrl.getFeatureById);
router.post("/features/:id", checkUserSession, featureCtrl.updateFeature);

module.exports = router;