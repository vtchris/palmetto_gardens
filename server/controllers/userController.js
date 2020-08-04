const db = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
    findOne: function (req, res) {
        db.User
            .findOne({ where: { email: req.body.username}})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        const hashedPassword = bcrypt.hash(req.body.password, 10).then(password => {
            let u = db.User;
            u.email = req.body.username;
            u.password = password;
            u.firstName = "general";
            u.lastName = "user";
    
            db.User.create(u)
                .then(data => res.json(data));
        })    
    }
    
}