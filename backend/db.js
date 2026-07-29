const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { connect };