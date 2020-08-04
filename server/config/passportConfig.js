const bcrypt = require("bcryptjs");
const db = require("../models");
const localStrategy = require("passport-local").Strategy;
const uc = require("../controllers/userController");

module.exports = function(passport){
    passport.use(
        new localStrategy({
            usernameField:"email",
            passwordField:"password"
        }, (email,password,done) => {
           
            db.User.findOne({where: {email: email}}).then((data) => { 
                           
                if(!data) return done(null, false);
                const u = data.dataValues; 

                bcrypt.compare(password, u.password, (err, result) => {
                    if (err) throw err;
                    if(result){                       
                        return done(null,u);
                    }else{
                        return done(null, false);
                    }
                })
            })
        })
    )
    passport.serializeUser((u,cb) => {       
        cb(null, u.userId);
    });
    passport.deserializeUser((id, cb) => {
        
        db.User.findOne({where: {userId: id}}).then(data=>{
            let u = data.dataValues;
            cb(null,u)
        })
    
    });
}