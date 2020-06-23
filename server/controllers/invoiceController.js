const db = require("../models");

module.exports = {
    create: function (req, res) {
        const invoice = req.body.invoice;
        let invoice_lines = req.body.cart;

        db.Invoice
            .create(invoice)
            .then(data => {
                // Add inv_id to each object in invoice_lines array
                invoice_lines = invoice_lines.map(line => {
                    const o = line;
                    o.invoice_id = data.dataValues.inv_id;
                    return o
                })
                return data;
            })
            .then(data =>
                // Insert each line item into Invoice_line table                
                invoice_lines                 
                    .forEach(line =>
                        db.Invoice_line.create(line))
                    .then(res => res.json(data))
                    .catch(err => console.log(err))
            )
            .catch(err => res.json(err));
    }
}