const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});
sendHtml = (mailOptions) => {
    fs.readFile(__dirname + '/../emailTemplates/inquiry.html', 'utf8', function(err,HTML){
        if(err) console.log(err);
        
        HTML = HTML.replace(/{FROM}/i,mailOptions.from)
        HTML = HTML.replace(/{MESSAGE}/i,mailOptions.text)
        mailOptions.html = HTML;
     
        sendEmail(mailOptions)
    })

}
sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (err, data) {
            
        if (err) {
            console.log(err)
        } else {            
            console.log(`Email Sent`)
        }
    })
}
module.exports = {
    send: function (req,res) {
        const mailOptions = req.body;
        sendHtml(mailOptions);      
        res.status(200).json("Email sent");
        
    }
};