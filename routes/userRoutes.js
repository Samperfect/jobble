const express = require('express');

// creating the router object
const userRouter = express.Router({ strict: true });

// requiring the user controllers
const user = require('../controllers/userController');

// defining the routes
// register user get
userRouter.get('/register', user.registerController);
// login user get
userRouter.get('/login', user.loginController);
// register user post
userRouter.post('/register', user.registerUser);
// login user post
userRouter.post('/login', user.loginUser);
// authenticate user get
userRouter.get('/auth', user.authController);
// authenticate user post
userRouter.post('/auth', user.authUser);

// exporting the mainRouter
module.exports = { userRouter };
