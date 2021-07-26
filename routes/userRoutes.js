const express = require('express');

// creating the router object
const userRouter = express.Router({ strict: true });

// requiring the user controllers
const user = require('../controllers/userController');

// defining the routes
userRouter.get('/register', user.registerController);
userRouter.get('/login', user.loginController);
userRouter.post('/register', user.registerUser);
userRouter.post('/login', user.loginUser);

// exporting the mainRouter
module.exports = { userRouter };
