var nodemailer = require('nodemailer');
var config = require('../../config/config.js');
var smtpTransport = require("nodemailer-smtp-transport");

var smtpTransporter = nodemailer.createTransport(smtpTransport({
    host: config.mailConfig.smtpHost,
    secureConnection: config.mailConfig.secureConnection,
    port: config.mailConfig.smtpPort,
    auth: {
        user: config.mailConfig.username,
        pass: config.mailConfig.password
    }
}));

module.exports = {

    // sendVerificationMail: function (userDetails) {
    //     link = "http://" + config.host + ":" + config.port + "/verify/" + userDetails.activationToken;
    //     mailOptions = {
    //         to: userDetails.email,
    //         subject: "Please confirm your Email account",
    //         html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    //     }
    //     smtpTransporter.sendMail(mailOptions, function (error, response) {
    //         if (error) {
    //             console.log("error: " + error);
    //         } else {
    //             console.log("Email sent to " + userDetails.email);
    //         }
    //     });
    // },

    sendResetPasswordToken: function (emailDetails) {
        // link = "http://" + config.host + ":" + config.port + "/resetPassword/" + emailDetails.resetToken;
        link = "ec2-18-217-140-4.us-east-2.compute.amazonaws.com/resetPassword/" + emailDetails.resetToken;
        mailOptions = {
            to: emailDetails.email,
            subject: "Please Reset your Password",
            html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here to reset password</a> <br> This link will expire in 1 hour"
        }
        smtpTransporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log("error: " + error);
            } else {
                console.log("Email sent to " + emailDetails.email);
            }
        });
    },
    passwordResetConfirmation: function(emailDetails){
        var data = {
            to: emailDetails.email,
            subject: 'Password Reset Confirmation',
            html: "Hello, <br> Your Password Successfully Changed"
        }
        smtpTransporter.sendMail(data, function (error, response) {
            if (error) {
                console.log("error: " + error);
            } else {
                console.log("Email sent to " + emailDetails.email);
            }
        });
    },

    sendPDF: function(emailDetails, doc){
        var data = {
            to: emailDetails.email,
            subject: 'Your Image Details',
            html: "Hello, <br> Please find your image details",
            attachments: [{
                filename: 'attachment.pdf',
                content: doc,
              }],
        }
        smtpTransporter.sendMail(data, function (error, response) {
            if (error) {
                console.log("error: " + error);
            } else {
              console.log("pdf sent to " + emailDetails.email);
            }
        });
    }

    
}