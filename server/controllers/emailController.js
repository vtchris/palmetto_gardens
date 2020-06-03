const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = {
    send: function (req,res) {
        const mailOptions = req.body;
        transporter.sendMail(mailOptions, function (err, data) {
            
            if (err) {
                console.log(err)
            } else {
                console.log(`Email Sent`)
            }
        })
    }
};