// const Mailjet = require('node-mailjet');
// const { MJ_API_KEY, MJ_SECRET_KEY, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//   apiKey: MJ_API_KEY,
//   apiSecret: MJ_SECRET_KEY,
// });

const nodemailer = require('nodemailer');
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465, // 25, 2525
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = {
    from: UKR_NET_EMAIL,
    ...data,
  };
  transport
    .sendMail(email)
    .then(() => console.log('Email is sended'))
    .catch(err => console.log(err));
};

module.exports = sendEmail;
