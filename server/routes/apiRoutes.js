const router = require("express").Router();
const productsController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController")

router.route("/products/active")
    .get(productsController.findActive)

router.route("/categories")
    .get(categoryController.findAll)

module.exports = router;