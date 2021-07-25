const express = require('express');

// creating the router object
const userRouter = express.Router({ strict: true });

// requiring the user controllers
const user = require('../controllers/userController');

// defining the routes
userRouter.get('/employer/register', user.registerController('Employer'));
userRouter.get('/employee/register', user.registerController('Employee'));
userRouter.get('/employer/login', user.loginController);
userRouter.get('/employee/login', user.loginController);
userRouter.post('/register', user.registerUser);

// exporting the mainRouter
module.exports = { userRouter };
