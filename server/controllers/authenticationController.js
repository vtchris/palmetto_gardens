const passport = require("passport");

module.exports = {
    login: function (req, res, next){        
        if(req.user){
            console.log("Already logged in")
        }    
        passport.authenticate("local", (err,u,info) => {          
            if(err) throw err;
            if(!u) res.status(401).send("No user found");
            else {
                req.logIn(u, err => {
                    if(err) throw err;
                    res.send("Successfully Authenticated");
                })
            }
        })(req,res,next)
    },
    logout: (req, res) => {   
        if(req.user){
            console.log("Logged in")
        }else{
            console.log("not logged in")
        }   
        console.log(req.user)
        req.logOut();
        console.log(req.user)
        res.status(200);
        res.send("logged out");
    }
}