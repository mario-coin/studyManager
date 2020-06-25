const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "090805c42ed69b",
      pass: "011d99badf6d28"
    }
  });

module.exports = transport;

//conta no mailtrap
//timeplagio@outlook.com
//studymanager2020