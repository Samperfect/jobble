// importing the required modules
const { User } = require('../models/users');
const { Listing } = require('../models/listings');

// defining the homepage controller function
homepageController = (req, res) => {
  res.render('dash', { user: req.user });
};

// the listings controller function
listingsController = async (req, res) => {
  const listings = await Listing.find({ author: req.user });
  res.render('jobs', { listings: listings });
};

// exporting the controller modules
module.exports = { homepageController, listingsController };
