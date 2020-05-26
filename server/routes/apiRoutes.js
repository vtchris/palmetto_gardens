const router = require("express").Router();
const productsController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const settingController = require("../controllers/settingController");

router.route("/products/active")
    .get(productsController.findActive)

router.route("/categories")
    .get(categoryController.findAll)

router.route("/settings")
    .get(settingController.findAll)

module.exports = router;