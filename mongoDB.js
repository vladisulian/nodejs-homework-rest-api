require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.DB_URI;

async function DB() {
  try {
    await mongoose.connect(uri);

    console.log("Database connection successful!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
  DB,
};
