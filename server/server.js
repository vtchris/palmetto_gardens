const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
//const passport = require("./passport");

const app = express();
// Requiring our models for syncing
const db = require("./models");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//app.use(passport.initialize());
//app.use(passport.session());

// Root get route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})
// API Routes
app.use("/api", apiRoutes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`Listening on port: ${PORT}`);
    })
})