const db = require("../models");

module.exports = {
    findOrCreate: function (req, res) {
        const customer = req.body;
        console.log(customer)
        db.Customer
            .findOrCreate({where: customer})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
}