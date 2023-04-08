const contacts = require("../models/contacts");

async function isContactWithSameFields(res, email, phone) {
  const contactsList = await contacts.listContacts();
  const contact = Object.values(contactsList).some(
    (contact) =>
      [contact.email, contact.phone].includes(email) ||
      [contact.email, contact.phone].includes(phone)
  );

  if (contact) {
    res
      .status(409)
      .json({ message: "Contact with this email or phone already exists." })
      .end();
  }
}

async function isContactExist(res, id) {
  const contact = await contacts.getContactById(id);

  if (!contact || contact === undefined) {
    res.status(404).json({ message: "Not found" }).end();
  }
  return contact;
}

function checkRequiredFields(res, name, email) {
  const missedFields = [];

  !name && missedFields.push("name");
  !email && missedFields.push("email");
  //*  !phone && missedFields.push("phone"); // maybe its not a required field

  if (missedFields.length > 0) {
    res
      .status(400)
      .json({ message: `Missing required fields: ${missedFields.join(", ")}` })
      .end();
  }
}

module.exports = {
  isContactWithSameFields,
  isContactExist,
  checkRequiredFields,
};
