const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'your gmail here',
        pass:'your google password here'
    },
    tls:{
        rejectUnauthorized: false
    }
})

module.exports = transporter;