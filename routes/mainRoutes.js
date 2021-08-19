// importing the required modules
const express = require('express');
const auth = require('../middlewares/auth');
const main = require('../controllers/mainController');
const { Test } = require('../models/test');
const { v4: uuidv4 } = require('uuid');
// creating the router object
const mainRouter = express.Router({ strict: true });

mainRouter.get('/', auth.loginRequired, main.homepageController);
mainRouter.get('/requests', auth.loginRequired, main.listingsController);

// testing point
mainRouter.get('/test', auth.loginRequired, async (req, res) => {
  res.render('form');
});

mainRouter.get('/admin', auth.loginRequired, async (req, res) => {
  var orders = await Test.find();
  res.render('admin', { orders: orders });
});

mainRouter.get('/order', auth.loginRequired, async (req, res) => {
  const identifier = req.query.identifier;

  const order = await Test.findOne({ identifier: identifier });

  res.render('order', { order: order });
});

mainRouter.post('/test', auth.loginRequired, async (req, res) => {
  // the logic goes here
  const data = req.body;

  const order = {
    fname: data.fname,
    lname: data.lname,
    email: data.email,
    phone: data.phone,
    address: data.address,
    identifier: uuidv4(),
  };

  const newOrder = await new Test(order);

  newOrder.save();

  res.redirect('/test');
});

// exporting the mainRouter
module.exports = { mainRouter };
