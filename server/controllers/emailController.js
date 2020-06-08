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
sendContact = (mailOptions) => {
    fs.readFile(__dirname + '/../emailTemplates/inquiry.html', 'utf8', function(err,HTML){
        if(err) console.log(err);
        
        HTML = HTML.replace(/{FROM}/ig,mailOptions.from)
        HTML = HTML.replace(/{NAME}/i,`${mailOptions.firstName} ${mailOptions.lastName}` )
        HTML = HTML.replace(/{PHONE}/i,mailOptions.phone)
        HTML = HTML.replace(/{MESSAGE}/i,mailOptions.text)
        mailOptions.html = HTML;
     
        sendEmail(mailOptions)
        sendThankyou(mailOptions);
    })

}
sendThankyou = (mailOptions) => {
    // Flip the to and from email addresses for the thank you
    const thankYouOptions = mailOptions;
    thankYouOptions.from = mailOptions.to;
    thankYouOptions.to = mailOptions.from;
    if(thankYouOptions.subject = "General Question") {thankYouOptions.subject = "Thank you"}
    mailOptions = thankYouOptions;
    const company = mailOptions.company;

    fs.readFile(__dirname + '/../emailTemplates/thankyou.html', 'utf8', function(err,HTML){
        if(err) console.log(err);
              
        HTML = HTML.replace(/{COMPANY}/ig,company.companyName)
        HTML = HTML.replace(/{ADDRESS1}/ig,company.address1)
        HTML = HTML.replace(/{ADDRESS2}/ig,
            company.address2
            ?  `<tr><td style="text-align:center;">${company.address2}</td></tr>`
            :  "")        
        HTML = HTML.replace(/{CSZ}/i,`${company.city}, ${company.state} ${company.zipCode}` )
        HTML = HTML.replace(/{PHONE}/i,company.phone1)
        
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
        sendContact(mailOptions);      
        res.status(200).json("Email sent");
        
    }
};