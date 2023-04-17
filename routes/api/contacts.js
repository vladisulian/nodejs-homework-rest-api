const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");


require("colors");

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getById);

router.post("/", contacts.addContact);

router.delete("/:contactId", contacts.deleteContact);

router.put("/:contactId", contacts.updateContact);

module.exports = router;
