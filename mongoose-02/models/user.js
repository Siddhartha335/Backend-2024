const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: false,
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

  const User = mongoose.model("user", userSchema);

  module.exports = User;