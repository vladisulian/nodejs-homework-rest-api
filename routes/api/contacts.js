const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  // the route will be '3000:/api/contacts[get-path]
  try {
    const data = await contacts.listContacts();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId);

    if (data === undefined) {
      res.status(404).end("Contact is not found");
    }

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await contacts.addContact(req.body);
    res.send(data);
    res.end("Contact added successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    contacts.removeContact(id);

    res.send("Contact is successfully removed!");
    next();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
