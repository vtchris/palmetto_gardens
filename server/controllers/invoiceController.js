const db = require("../models");

module.exports = {
    create: function (req, res) {
        const invoice = req.body;
        console.log(invoice)
        db.Invoice
            .create(invoice)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
}