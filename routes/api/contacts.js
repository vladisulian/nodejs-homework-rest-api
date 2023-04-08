const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

require("colors");

const handleValidations = require("../../controllers/handleValidations");
router.get("/", async (req, res, next) => {
  // the route will be '3000:/api/contacts[get-path]
  try {
    const data = await contacts.listContacts();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const data = await handleValidations.isContactExist(res, contactId);

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    handleValidations.checkRequiredFields(res, name, email, phone);
    await handleValidations.isContactWithSameFields(res, email, phone);

    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);

    res.end("Contact added successfully!");
  } catch (error) {
    res.status(500).end("Error adding contact");
    throw new Error(`${error.message}`.red);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    await handleValidations.isContactExist(res, id);
    await contacts.removeContact(id);

    res.send("Contact is successfully removed!");
    next();
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "Missing fields" }).end();
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
});

module.exports = router;
