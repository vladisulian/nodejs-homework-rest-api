const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  // the route will be '3000:/api/contacts[get-path]
  try {
    const data = await contacts.listContacts();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error adding contact" });
    throw new Error(`${error.message}`.red);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    await contacts.removeContact(id);

    res.json({ message: "Contact deleted" }).status(200);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).send(error.message);
    throw new Error(`${error.message}`.red);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
};
