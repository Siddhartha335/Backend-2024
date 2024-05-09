const mongoose = require("mongoose");

const connectToMongoDB = async (url) => {
    return await mongoose.connect(url);
}

module.exports = {
    connectToMongoDB
}