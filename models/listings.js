const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Listing };
