require('dotenv').config();
const nodemailer = require('nodemailer');

const code = Math.floor(
    Math.random() * (700000 - 100000) + 100000
)

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

function getMailOptions() {
    return {
        from: '2018cs61@student.uet.edu.pk',
        // to: 'abc@gmail.com',
        subject: 'Verification Code for Mind Web Series',
        text: ''
    }
}

function sendMail(email, message, res) {
    const mailOpts = getMailOptions();

    return transporter.sendMail({ ...mailOpts, to: email, text: message }, (err, data) => {
        if (err) {
            res.status(500).json(`${err}`)
        }
        else {
            res.status(200).json({ message: "Verification code sent to you email. Please verify your account by entring the verification code." })
        }

    });
}



module.exports = { sendMail, code }