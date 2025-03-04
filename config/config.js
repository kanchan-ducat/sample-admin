const dotenv = require("dotenv");
const path = require("path");

// Load environment file based on NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? "production.env" : "development.env";
dotenv.config({ path: path.resolve(__dirname, `../env/${envFile}`) });

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  logLevel: process.env.LOG_LEVEL || "info",
};
