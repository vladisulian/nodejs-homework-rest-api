// const Contact = require("./mongoModels");
const fs = require("fs/promises");
const path = require("path");

const mongoose = require("mongoose");
const { contactsSchema } = require("../Schemas/contactsSchema");
const Contact = mongoose.model("contacts", contactsSchema);

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const updatedContactsList = contactsList.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsList, null, 2)
  );

  return updatedContactsList;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const contactsList = await listContacts();

  const newContact = {
    // id: nanoid(21),
    name,
    email,
    phone,
  };

  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const updatedContactsList = contactsList.map((contact) => {
    if (contact.id === contactId) {
      return { ...contact, ...body };
    }
    return contact;
  });

  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactsList, null, 2)
  );

  return await getContactById(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
