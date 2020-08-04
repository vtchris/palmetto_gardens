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
sendContact = (mailData) => {
    fs.readFile(__dirname + '/../emailTemplates/inquiry.html', 'utf8', function (err, HTML) {
        if (err) console.log(err);

        HTML = HTML.replace(/{FROM}/ig, mailData.mailOptions.from)
        HTML = HTML.replace(/{NAME}/i, `${mailData.firstName} ${mailData.lastName}`)
        HTML = HTML.replace(/{PHONE}/i, mailData.phone)
        HTML = HTML.replace(/{MESSAGE}/i, mailData.mailOptions.text)
        mailData.mailOptions.html = HTML;
        
        sendEmail(mailData.mailOptions)
        sendThankyou(mailData);
    })

}
sendOrder = (mailData) => {
    fs.readFile(__dirname + '/../emailTemplates/order.html', 'utf8', function (err, HTML) {
        if (err) console.log(err);

        const { cart, invoice, settings, user, mailOptions } = mailData;

        HTML = HTML.replace(/{FROM}/ig, `<li>${user.email}</li>`)
        HTML = HTML.replace(/{NAME}/i, `<li>${user.firstName} ${user.lastName}</li>`)
        HTML = HTML.replace(/{PHONE}/i, `<li>${user.phone}</li>`)
        HTML = HTML.replace(/{ADDRESS1}/i, `<li>${user.address1}</li>`)
        HTML = HTML.replace(/{ADDRESS2}/i, 
            user.address2
            ? `<li>${user.address1}</li>`
            : ''
        )       
        HTML = HTML.replace(/{CSZ}/i, `<li>${user.city}, ${user.state} ${user.zip}</li>`)
        let orderTable = ""
        cart.forEach(item => orderTable += `<tr><td style="text-align: left">${item.itm_name}</td><td style="text-align: right">$${item.itm_prc.toFixed(2)}</td><td style="text-align: right">${item.qty}</td><td style="text-align: right">$${(item.itm_prc * item.qty).toFixed(2)}</td></tr>\n`)
        HTML = HTML.replace(/{ORDER-LINEITEMS}/i, orderTable)
        let totals = ""
        if(invoice.tax){
            totals = `<tr><td>Tax:</td><td colspan="3" style="text-align: right">$${invoice.tax}</td</tr>\n`
        }
        totals += `<tr><td>Total:</td><td colspan="3" style="text-align: right">$${invoice.total}</td</tr>`
        HTML = HTML.replace(/{TOTAL}/i, totals);
        HTML = updateSettingsInfo(HTML, settings);
        mailOptions.html = HTML;
       
        sendEmail(mailOptions);

    })

}
sendThankyou = (mailData) => {
    // Flip the to and from email addresses for the thank you
    const { to, from } = mailData.mailOptions;
    mailData.mailOptions.to = from;
    mailData.mailOptions.from = to;
    
    if (mailData.mailOptions.subject = "General Question") { mailData.mailOptions.subject = "Thank you" }
       
    const settings = mailData.settings;

    fs.readFile(__dirname + '/../emailTemplates/thankyou.html', 'utf8', function (err, HTML) {
        if (err) console.log(err);

        HTML = updateSettingsInfo(HTML, settings)

        mailData.mailOptions.html = HTML;
       
        sendEmail(mailData.mailOptions);
    })

}
sendEmail = (mailOptions) => {
    
    transporter.sendMail(mailOptions, function (err, data) {
        
        // if (err) {
        //     console.log(err)
        // } else {
        //     console.log(`Email Sent`)
        // }
    })
}
updateSettingsInfo = (HTML, settings) => {

    HTML = HTML.replace(/{COMPANY_NAME}/ig, settings.companyName);
    HTML = HTML.replace(/{COMPANY_ADDRESS1}/ig, settings.address1);
    HTML = HTML.replace(/{COMPANY_ADDRESS2}/ig,
        settings.address2
            ? `<tr><td style="text-align:center;">${settings.address2}</td></tr>`
            : "");
    HTML = HTML.replace(/{COMPANY_CSZ}/i, `${settings.city}, ${settings.state} ${settings.zipCode}`);
    HTML = HTML.replace(/{COMPANY_PHONE}/i, settings.phone1);

    return HTML;

}
module.exports = {
    send: function (req, res) {
        const emailData = req.body;
        
        switch (emailData.page) {
            case "contact":
                sendContact(emailData);
                break;
            case "order":
                sendOrder(emailData);
                break;
            default:
                res.status(404).json("Email type unknown");
        }

        res.status(200).json("Email sent");

    }
};