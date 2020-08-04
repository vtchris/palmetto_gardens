const apiRoutes = require("./routes/apiRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const app = express();
// Requiring our models for syncing
const db = require("./models");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true
    })
);

app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized:true
}));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Root get route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// API Routes
app.use("/api", apiRoutes);

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`Listening on port: ${PORT}`);
    })
});