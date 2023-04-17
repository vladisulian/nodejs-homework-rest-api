require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.DB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
