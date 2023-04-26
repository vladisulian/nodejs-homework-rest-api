const contacts = require("../models/contacts");
const Contact = require("../Schemas/contacts");

require("colors");

const getAll = async (req, res, next) => {
  // the route will be '3000:/api/contacts[get-path]
  try {
    const data = await Contact.find();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);

    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error adding contact" });
    console.error(`Error ==> ${error.message}`.red);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    await contacts.removeContact(id);

    res.json({ message: "Contact deleted" }).status(200);
  } catch (error) {
    res.status(500).send(error);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const updateFavoriteStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contacts.updateFavoriteStatus(contactId, req.body);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(`Error ==> ${error.message}`.red);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateFavoriteStatus,
};
