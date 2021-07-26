// defining the homepage controller function
homepageController = (req, res) => {
  res.render('login');
};

// the listings controller function
listingsController = (req, res) => {
  res.render('listings');
};

// exporting the controller modules
module.exports = { homepageController, listingsController };
