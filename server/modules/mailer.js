const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "882b9123734e80",
      pass: "0aafe73ebfb012"
    }
  });

module.exports = transport;

//sstudymanager@outlook.com
//studymanager2020