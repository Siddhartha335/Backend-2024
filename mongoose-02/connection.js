const mongoose = require("mongoose");

async function connectMongoDB(url) {
  mongoose
    .connect(url)
    .then(console.log("MongoDB connected succesfully!"))
    .catch((err) => console.log("MongoDB error: ", err));
}

module.exports = connectMongoDB;
