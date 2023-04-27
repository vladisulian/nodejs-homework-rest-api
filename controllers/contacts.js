const Contact = require("../models/contacts");

require("colors");

const getAll = async (req, res, next) => {
  // the route will be '3000:/api/contacts[get-path]
  try {
    const owner = req.user.id;

    console.log(req.query);

    if (req.query.favorite === "true") {
      return getByFavorite(req, res, next);
    }

    const data = await Contact.find({ owner });
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

const getByFavorite = async (req, res, next) => {
  try {
    const favorites = await Contact.find({
      owner: req.user.id,
      favorite: true,
    });
    return res.json(favorites);
  } catch (error) {
    console.error(`${error}`.red);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addContact = async (req, res, next) => {
  try {
    console.log("req.user.id ===> ", req.user.id);
    const contact = {
      owner: req.user.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite || false,
    };
    console.log("req.user.id", req.user.id);

    const createdContact = await Contact.create(contact);

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
