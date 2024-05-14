var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const roleController = require("../controllers/role");
const { hidePassword } = require("../middleware/password");
const { checkUserSession } = require("../middleware/interceptor");

/* GET api. */
router.get("/", (req, res, next) => {
    res.render("error", { message: "Access Restricted", error: { status: 403, stack: 'Forbidden' } });
});

/* User Router */
router.get("/users", checkUserSession, userController.getUsers);
router.get("/users/:id", checkUserSession, userController.getUserById);
router.post("/user/login", userController.login, hidePassword);
router.post("/user/signup", userController.createUser, hidePassword);
router.get("/user/logout", userController.logout);
router.post("/user/:id", checkUserSession, userController.updateUser);

/* Role Router */
router.get("/roles", checkUserSession, roleController.getRoles);
router.get("/roles/:id", checkUserSession, roleController.getRoleById);
router.post("/roles/create", checkUserSession, roleController.createRole);
router.post("/user/signup", userController.createUser, hidePassword);
router.get("/user/logout", userController.logout);
router.post("/user/:id", checkUserSession, userController.updateUser);

module.exports = router;