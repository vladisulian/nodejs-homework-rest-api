const Contact = require("../models/contacts");

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
    const data = await Contact.findById(contactId);

    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const newContact = { name, email, phone };

    const createdContact = await Contact.create(newContact);

    return res.status(201).json(createdContact);
  } catch (error) {
    res.status(500).json({ message: "Error adding contact" });
    console.error(`Error ==> ${error.message}`.red);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.contactId);

    res.json({ message: "Contact deleted" }).status(200);
  } catch (error) {
    res.status(500).send(error);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);

    return res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).send(error.message);
    console.error(`Error ==> ${error.message}`.red);
  }
};

const updateFavoriteStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    await Contact.findByIdAndUpdate(contactId, req.body); //* updating a contact

    const contact = await Contact.findById(contactId); // finding a contact to show him 

    return res.status(200).json(contact);
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
