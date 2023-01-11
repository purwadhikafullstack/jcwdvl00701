const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'turujcwdvl00701@gmail.com',
        pass : 'ogucbeplvtcxbvuv'
    },
    tls : {
        rejectUnauthorized : false
    }
})

module.exports = transporter