const db = require("../models");

module.exports = {
    findActive: function (req, res) {

        db.Products
            .findAll({ where: { active: true }, order: ["itm_name"] })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
}