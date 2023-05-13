const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database connection successful!"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
