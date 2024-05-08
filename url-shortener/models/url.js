const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  totalClicks: [{ timestamp: { type: Number } }],
});

const URL = mongoose.model('url',urlSchema);

module.exports = URL;