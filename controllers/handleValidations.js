const contacts = require("../models/contacts");

async function isContactWithSameProps(body) {
  const { email, phone } = body;
  const contactsList = await contacts.listContacts();
  const contact = Object.values(contactsList).some(
    (contact) =>
      [contact.email, contact.phone].includes(email) ||
      [contact.email, contact.phone].includes(phone)
  );
  return contact;
}

async function isContactExist(res, id) {
  const contact = await contacts.getContactById(id);

  if (!contact || contact === undefined) {
    res.status(404).json({ message: "Not found" });
  }
  return contact;
}

module.exports = {
  isContactWithSameProps,
  isContactExist,
};
