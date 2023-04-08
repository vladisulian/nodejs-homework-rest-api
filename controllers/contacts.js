const contacts = require("../models/contacts");
const handleValidations = require("../controllers/handleValidations");
const { contactsSchema } = require("../Schemas/contacts");

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
    const data = await handleValidations.isContactExist(res, contactId);

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message }).end();
      return;
    }

    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).end("Error adding contact");
    throw new Error(`${error.message}`.red);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const exist = await handleValidations.isContactExist(res, id);

    if (!exist) {
      return;
    }

    await contacts.removeContact(id);

    res.send("Contact is successfully removed!");
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
};

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const { error } = contactsSchema.validate(req.body);

  if (error) {
    res
      .status(400)
      .json({ message: `Missing fields: ${error.details[0].path[0]}` })
      .end();
    return;
  }

  try {
    await handleValidations.isContactExist(res, id);

    const updatedContact = await contacts.updateContact(id, req.body);

    res.status(200).json({ updatedContact });
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
