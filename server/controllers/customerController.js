const db = require("../models");

module.exports = {
    findOrCreate: function (req, res) {
        const customer = req.body;
        db.Customer
            .findOrCreate({where: customer})
            .then(result => res.json(result[0].dataValues))
            .catch(err => res.json(err));
    }
}