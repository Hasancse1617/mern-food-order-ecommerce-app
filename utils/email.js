const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports.SendEmail = (email) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_GMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const emailToken = jwt.sign({email}, process.env.EMAIL_SECRET, {
        expiresIn: '10m'
       });
      const url = `http://localhost:3000/admin/reset-password/${emailToken}`;
      transporter.sendMail({
        from: `"Hasan Ali" ${process.env.SMTP_GMAIL}`, // sender address
        to: email, // list of receivers
        subject: "User Reset Password ✔", // Subject line
        text: "Please check your email to reset your password", // plain text body
        html: `<h4><a href="${url}">${emailToken}</a></h4><br><b>Please check your email to reset your password click <a href="${url}">here!!!</a></b>`, // html body
      }).then(info => {
        return true;
      }).catch(()=>{
        
      });
}

module.exports.sendAccountVerify = (email) =>{
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_GMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailToken = jwt.sign({email}, process.env.EMAIL_SECRET, {
      expiresIn: '10m'
     });
    const url = `http://localhost:3002/user/verify-account/${emailToken}`;
    transporter.sendMail({
      from: `"Hasan Ali" ${process.env.SMTP_GMAIL}`, // sender address
      to: email, // list of receivers
      subject: "User Account Activation ✔", // Subject line
      text: "Thanks for created account. Please verify your account", // plain text body
      html: `<h4><a href="${url}">${emailToken}</a></h4><br><b>Verify your account Please click <a href="${url}">here!!!</a></b>`, // html body
    }).then(info => {
      return true;
    }).catch(()=>{
      
    });
}