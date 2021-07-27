// importing the required modules
const { User } = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const { Nodemailing } = require('nodemailing');

// session initializer
const initSession = (user, session) => {
  session.user = user;
};

// login required middleware
const loginRequired = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('user/login');
  }
  // getting the user from the database
  user = await User.findOne({ _id: req.session.user });
  req.user = user;
  return next();
};

// generate otp
const generateOTP = async () => {
  // generating the otp using Math.random
  const otp = (Math.random() * 2).toString().slice(2, 7);
  //  checking of otp exists
  dup = await User.findOne({ otp: otp });
  if (dup) {
    //   using recursion to regenerate otp
    await generateOTP();
  } else {
    //   returning the otp
    return otp;
  }
};

// send otp
const sendOTP = (otp, user) => {
  const msg = {
    Host: 'smtp.googlemail.com',
    Username: process.env.EMAIL_USERNAME,
    Password: process.env.EMAIL_PASSWORD,
    To: user.email,
    From: `kris@gmail.com`,
    Subject: `OTP To Complete Login`,
    Body: `<p>Hello ${user.fname},</p><p>Find below your OTP to complete your login</p><p>${otp}</p>`,
  };

  Nodemailing.send(msg).then((msg) => {
    //   console.log(msg);
  });
};

module.exports = { initSession, loginRequired, generateOTP, sendOTP };
