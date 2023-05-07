const nodemailer = require("nodemailer");
require("dotenv").config();
require("colors");

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDEREMAIL,
    pass: process.env.PASSWORD,
  },
};

const sendEmail = (emailTO, verificationToken) => {
  try {
    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
      from: process.env.SENDEREMAIL,
      to: emailTO,
      subject: "Verify your email",
      html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Confirm your Email</a>`,
    };

    transporter.sendMail(mailOptions);
    console.log(`Email successfully sent!`.yellow);
  } catch (error) {
    console.error(`Oups, something went wrong :(`.red);
    console.error(`${error.message}`.red);
  }
};
module.exports = sendEmail;
