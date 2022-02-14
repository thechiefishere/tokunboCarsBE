const mongoose = require("mongoose");

const connect = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
