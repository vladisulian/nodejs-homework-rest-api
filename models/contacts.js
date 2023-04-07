const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const listContacts = JSON.parse(data);

  return listContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
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
    id: nanoid(8),
    name,
    email,
    phone,
  };

  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return {
    contact: newContact,
    statusCode: 201,
  };
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

  return updatedContactsList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
