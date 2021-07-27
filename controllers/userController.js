// importing the required modules
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

// defining the register controller
const registerController = (req, res) => {
  res.render('register');
};

// defining the login controller
const loginController = (req, res) => {
  res.render('login');
};

// register user controller
const registerUser = async (req, res) => {
  // creating the error object
  errors = {};
  // getting the form data
  const body = req.body;
  // checking for errors in user data
  if (
    !body.fname ||
    !body.lname ||
    !body.email ||
    !body.password ||
    !body.phone ||
    !body.address
  ) {
    errors.gen = "This field can't be empty";
  }
  if (body.password.length < 10) {
    errors.password = 'Password must be a minimum of 10 characters';
  }
  if (Object.keys(errors).length > 0) {
    res.redirect(`./register`);
    return;
  }
  // checking for errors in user data end

  // checking if the user exits already
  existing = await User.findOne({ email: body.email });

  if (existing) {
    errors.email = 'That email is already in use';
    res.redirect(`./register`);
    return;
  }

  // hashing the password
  bcrypt.hash(body.password, 10, (error, hash) => {
    if (error) throw error;
    //   adding the password hash to the body object
    body.password = hash;
    //   creating the user object and saving to the database
    const user = new User(body);
    try {
      user.save();
    } catch (error) {
      errors.gen = 'Something went wrong';
      res.redirect(`./register`);
      return;
    }
    req.flash('success_msg', 'Account registered successfully!');
    res.redirect(`./login`);
    return;
  });
  return;
};

// login user controller
const loginUser = async (req, res) => {
  // creating the error object
  errors = {};
  // getting the form data
  const body = req.body;

  // checking for errors in user data
  if (!body.email || !body.password) {
    errors.gen = "This field can't be empty";
  }
  if (Object.keys(errors).length > 0) {
    res.redirect(`./login`);
    return;
  }
  // checking for errors in user data end

  // checking if the user exits already
  user = await User.findOne({ email: body.email });

  if (!user) {
    //   errors.email = 'That account does not exist';
    req.flash('error_msg', 'That account does not exist');
    res.redirect(`./login`);
    return;
  }

  // checking if the user password matches
  const match = await bcrypt.compare(body.password, user.password);

  if (!match) {
    req.flash('error_msg', 'Invalid login credentials provided');
    res.redirect(`./login`);
    return;
  }

  const otp = await auth.generateOTP();
  console.log(otp);
  user.otp = otp;

  try {
    await user.save();
    auth.sendOTP(otp, user);
  } catch (error) {
    req.flash('error_msg', 'Something went wrong');
    res.redirect('./login');
    return;
  }

  res.redirect('./auth');
  return;
};

// defining the auth user controller
const authController = (req, res) => {
  res.render('auth');
};

// auth user controller
const authUser = async (req, res) => {
  // creating the error object
  errors = {};
  // getting the form data
  const body = req.body;

  // checking for errors in user data
  if (!body.otp) {
    errors.gen = "This field can't be empty";
  }
  if (Object.keys(errors).length > 0) {
    res.redirect(`./auth`);
    return;
  }
  // checking for errors in user data end

  // checking if the user exits already
  user = await User.findOne({ otp: body.otp });

  if (!user) {
    //   errors.email = 'That account does not exist';
    req.flash('error_msg', 'Invalid OTP Provided');
    res.redirect(`./login`);
    return;
  }

  // destroying the otp
  user.otp = null;
  await user.save();
  // creating the user session
  auth.initSession(user._id, req.session);
  res.redirect('/');
  return;
};

// logout user controller
const logoutUser = (req, res) => {
  return;
};

// exporting the user controllers
module.exports = {
  registerController,
  loginController,
  registerUser,
  logoutUser,
  loginUser,
  authController,
  authUser,
};
