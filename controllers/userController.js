// defining the employer resgier controller
const registerController = (req, res) => {
  res.render('register');
};

// defining the employer resgier controller
const loginController = (req, res) => {
  res.render('login');
};

module.exports = { registerController, loginController };
