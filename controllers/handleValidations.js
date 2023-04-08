const contacts = require("../models/contacts");

async function isContactExist(res, id) {
  const contact = await contacts.getContactById(id);

  if (!contact || contact === undefined) {
    res.status(404).json({ message: "Not found" });
  }
  return contact;
}

module.exports = {
  isContactExist,
};
