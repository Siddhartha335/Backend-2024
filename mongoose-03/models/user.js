const mongoose = require('mongoose')

//Schema of an Database
const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      gender: {
        type: String,
      },
      jobTitle: {
        type: String,
      },
    },
    { timestamps: true }
  );

module.exports = userSchema;