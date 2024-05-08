const mongoose = require("mongoose");

const handleConnection = async (path) => {
  mongoose
    .connect(path)
    .then(() => console.log("MongoDB connected succesfully!"))
    .catch((err) => {
      console.log("Error: ", err);
    });
};

module.exports = handleConnection
