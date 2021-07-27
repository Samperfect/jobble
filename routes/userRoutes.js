// importing the required modules
const express = require('express');
const auth = require('../middlewares/auth');

// creating the router object
const userRouter = express.Router({ strict: true });

// requiring the user controllers
const user = require('../controllers/userController');

// defining the routes
// register user get
userRouter.get('/register', auth.loginRedirect, user.registerController);
// login user get
userRouter.get('/login', auth.loginRedirect, user.loginController);
// register user post
userRouter.post('/register', auth.loginRedirect, user.registerUser);
// login user post
userRouter.post('/login', auth.loginRedirect, user.loginUser);
// authenticate user get
userRouter.get('/auth', auth.loginRedirect, user.authController);
// authenticate user post
userRouter.post('/auth', auth.loginRedirect, user.authUser);
// authenticate user post
userRouter.get('/logout', auth.loginRequired, user.logoutUser);

// exporting the mainRouter
module.exports = { userRouter };
