// importing the required modules
const express = require('express');
const auth = require('../middlewares/auth');

// creating the router object
const mainRouter = express.Router({ strict: true });

// requiring the user controllers
const main = require('../controllers/mainController');

mainRouter.get('/', auth.loginRequired, main.homepageController);
mainRouter.get('/listings', main.listingsController);

// exporting the mainRouter
module.exports = { mainRouter };
