const express = require('express');

// creating the router object
const userRouter = express.Router({ strict: true });

// requiring the user controllers
const user = require('../controllers/userController');

userRouter.get('/employer/register', user.registerController);
userRouter.get('/employee/register', user.registerController);
userRouter.get('/employer/login', user.loginController);
userRouter.get('/employee/login', user.loginController);

// exporting the mainRouter
module.exports = { userRouter };
