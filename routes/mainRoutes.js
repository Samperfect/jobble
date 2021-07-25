const express = require('express');

// creating the router object
const mainRouter = express.Router({ strict: true });

// requiring the user controllers
const main = require('../controllers/mainController');

mainRouter.get('/', main.homepageController);
mainRouter.get('/listings', main.listingsController);

// exporting the mainRouter
module.exports = { mainRouter };
