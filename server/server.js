const express = require("express");
const path = require("path");

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root get route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.listen(PORT, function(){
    console.log(`Listening on port: ${PORT}`);
})