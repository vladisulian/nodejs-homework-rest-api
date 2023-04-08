const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

require("colors");

async function isContactFieldsAlreadyExist(email, phone) {
  const contactsList = await contacts.listContacts();
  return Object.values(contactsList).some(
    (contact) =>
      [contact.email, contact.phone].includes(email) ||
      [contact.email, contact.phone].includes(phone)
  );
}
async function isContactExist(res, id) {
  const contact = await contacts.getContactById(id);
  if (contact === undefined) {
    res.status(404).json({ message: "Not found" }).end();
  }
  return contact;
}

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
    const data = await isContactExist(res, contactId);

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "Missing required name field" });
    return;
  }

  if (await isContactFieldsAlreadyExist(email, phone)) {
    res
      .status(409)
      .json({ message: "Contact with this email or phone already exists." })
      .end();
    return;
  }

  try {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);

    res.end("Contact added successfully!");
  } catch (error) {
    res.status(500).end("Error adding contact");
    throw new Error(`${error.message}`.red);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;

  isContactExist(res, id);

  try {
    await contacts.removeContact(id);

    res.send("Contact is successfully removed!");
    next();
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch (error) {
    res.status(500).send(error);
    throw new Error(`${error.message}`.red);
  }
});

module.exports = router;
