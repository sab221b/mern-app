var express = require("express");
var router = express.Router();
const { hidePassword } = require("../middleware/password");
const { checkUserSession, getUserBySession } = require("../middleware/interceptor");
const userCtrl = require("../controllers/user");
const roleCtrl = require("../controllers/role");
const featureCtrl = require("../controllers/feature");
const productCtrl = require('../controllers/product')

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
router.get("/roles/:id", checkUserSession, roleCtrl.getRoleById);
router.post("/roles/create", checkUserSession, roleCtrl.createRole);
router.post("/roles/:id", checkUserSession, roleCtrl.updateRole);

/* Feature Router */
router.get("/features", checkUserSession, featureCtrl.getFeatures);
router.get("/features/:id", checkUserSession, featureCtrl.getFeatureById);
router.post("/features/create", checkUserSession, featureCtrl.createFeature);
router.post("/features/:id", checkUserSession, featureCtrl.updateFeature);

/* Product Router */
router.get("/products", checkUserSession, productCtrl.getProducts);
router.get("/products/:id", checkUserSession, productCtrl.getProductById);
router.post("/products/create", checkUserSession, productCtrl.createProduct);
router.post("/products/:id", checkUserSession, productCtrl.updateProduct);

module.exports = router;