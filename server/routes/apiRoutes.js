const router = require("express").Router();
const articlesController = require("../controllers/articlesController");
const categoryController = require("../controllers/categoryController");
const emailController = require("../controllers/emailController");
const productsController = require("../controllers/productController");
const settingController = require("../controllers/settingController");

router.route("/articles")
    .get(articlesController.findAll)

router.route("/categories")
    .get(categoryController.findAll)

router.route("/email")
    .post(emailController.send)

router.route("/products/active")
    .get(productsController.findActive)

router.route("/settings")
    .get(settingController.findAll)

module.exports = router;