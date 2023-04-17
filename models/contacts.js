const mongoose = require("mongoose");
const { contactsSchema } = require("../Schemas/contactsSchema");
const Contact = mongoose.model("contacts", contactsSchema);

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = {
    name,
    email,
    phone,
  };

  return await Contact.create(newContact);
};

const updateContact = async (contactId, body) => {
  await Contact.findByIdAndUpdate(contactId, body);
  return await getContactById(contactId);
};

const updateFavoriteStatus = async (contactId, body) => {
  await Contact.findByIdAndUpdate(contactId, body);
  return await getContactById(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
  Contact,
};
