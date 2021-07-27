// importing the required modules
const session = require('express-session');
const MongoStore = require('connect-mongo');

//express session
const new_session = session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
});

// destroy session
const destroySession = (req, res, next) => {
  req.session.destroy(request.sessionID, (err) => {
    res.redirect('../../user/login');
    return;
  });
  next();
};

//use flash
const messages = (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
};

// exporting the utilities modules
module.exports = { messages, new_session, destroySession };
