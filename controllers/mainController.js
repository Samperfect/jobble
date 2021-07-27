// defining the homepage controller function
homepageController = (req, res) => {
  res.render('dash', { user: req.user });
};

// the listings controller function
listingsController = (req, res) => {
  res.render('listings');
};

// exporting the controller modules
module.exports = { homepageController, listingsController };
