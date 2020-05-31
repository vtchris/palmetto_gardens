const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        
        db.Article
            .findAll({  })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
}