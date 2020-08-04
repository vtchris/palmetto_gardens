const router = require("express").Router();
const ac = require("../controllers/articlesController");
const authc = require("../controllers/authenticationController");
const catc = require("../controllers/categoryController");
const cc = require("../controllers/customerController");
const ec = require("../controllers/emailController");
const ic = require("../controllers/invoiceController");
const pc = require("../controllers/productController");
const sc = require("../controllers/settingController");
const uc = require("../controllers/userController");

router.route("/articles")
    .get(ac.findAll)

router.route("/categories")
    .get(catc.findAll)

router.route("/customers")
    .post(cc.findOrCreate)

router.route("/email")
    .post(ec.send)

router.route("/invoice")
    .post(ic.create)

router.route("/login")
    .post(authc.login)

router.route("/logout")
    .post(authc.logout)

router.route("/products/active")
    .get(pc.findActive)

router.route("/settings")
    .get(sc.findAll)

router.route("/users")
    .post(uc.create)

    module.exports = router;