const session = require('express-session');
//express session
const new_session = session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
});

//use flash
const messages = (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
};

module.exports = { new_session, messages };
