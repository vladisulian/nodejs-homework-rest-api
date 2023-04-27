const mongoose = require("mongoose");

const contacts = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    userID: {
      type: String,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("contacts", contacts);

module.exports = Contact;
