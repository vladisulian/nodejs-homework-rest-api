require("dotenv").config();
const mongoose = require("mongoose");
// const { contactsSchema } = require("./Schemas/contactsSchemaMongoose");

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

//   const Contact = mongoose.model("contacts", contactsSchema);

//   const res = await Contact.find({ name: "Allen Raymond" });
//   console.log(res);

module.exports = {
  DB,
};
