const mongoose = require("mongoose");
const { contacts } = require("../Schemas/contacts");
const Contact = mongoose.model("contacts", contacts);

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error(error);
  }
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
