const nodemailer = require('nodemailer');
const util = require('util');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
// const fs = require('fs');
// const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'razak9098@gmail.com',
    pass: 'jdrgivkvkqqdmnps',
  },
});

const hbsOptions = {
  viewEngine: {
    extName: '.handlebars',
    // partialDisk: path.resolve('../resources/mail'),
    partialsDir: path.resolve(__dirname, '../resources/mail'),
    // layoutsDir: path.resolve('../resources/'),
    // defaultLayout: null,
    defaultLayout: null,
  },
  viewPath: path.resolve(__dirname, '../resources/mail'),
  tls: {
    rejectUnauthorized: false,
  },
  extName: '.handlebars',
};

transporter.use('compile', hbs(hbsOptions));

const transporterPromisify = util.promisify(transporter.sendMail).bind(transporter);

module.exports = {
  transporter,
  transporterPromisify,
};
