const router = require("express").Router();
const productsController = require("../controllers/productController");

router.route("/products/active")
    .get(productsController.findActive)


module.exports = router;