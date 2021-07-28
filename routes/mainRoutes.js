// importing the required modules
const express = require('express');
const auth = require('../middlewares/auth');
const main = require('../controllers/mainController');

// creating the router object
const mainRouter = express.Router({ strict: true });

mainRouter.get('/', auth.loginRequired, main.homepageController);
mainRouter.get('/requests', auth.loginRequired, main.listingsController);

// exporting the mainRouter
module.exports = { mainRouter };
