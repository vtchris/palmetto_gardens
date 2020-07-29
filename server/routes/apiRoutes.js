const router = require("express").Router();
const articlesController = require("../controllers/articlesController");
const categoryController = require("../controllers/categoryController");
const customerController = require("../controllers/customerController");
const emailController = require("../controllers/emailController");
const invoiceController = require("../controllers/invoiceController");
const productsController = require("../controllers/productController");
const settingController = require("../controllers/settingController");
const userController = require("../controllers/userController");
const passport = require("../passport");

// passport.authenticate("local-signUp", () => {

// })

router.route("/articles")
    .get(articlesController.findAll)

router.route("/categories")
    .get(categoryController.findAll)

router.route("/customers")
    .post(customerController.findOrCreate)

router.route("/email")
    .post(emailController.send)

router.route("/invoice")
    .post(invoiceController.create)

router.route("/products/active")
    .get(productsController.findActive)

router.route("/settings")
    .get(settingController.findAll)

// router.post("/user/login", passport.authenticate("local-signup", {
//     successRedirect: "/order",
//     failureRedirect: "/produce",
//     session: false
// }))
router.post("/user/login", (req, res) => passport.authenticate("local-signup", {
    successRedirect: "/order",
    failureRedirect: "/produce",
    session: false
})(req,res))
//.post(userController.login)
// .put(userController.update)

module.exports = router;