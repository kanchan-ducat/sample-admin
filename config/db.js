const mongoose = require("mongoose");
const { mongoURI } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/');
    console.log(`MongoDB Connected: ${mongoURI}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
