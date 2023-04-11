const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const validation = require("../../controllers/handleValidations");
const { joiValidate } = require("../../Schemas/contacts");

require("colors");

router.get("/", contacts.getAll);

router.get("/:contactId", validation.isContactExist, contacts.getById);

router.post(
  "/",
  validation.isContactWithSameProps,
  joiValidate,
  contacts.addContact
);

router.delete("/:contactId", validation.isContactExist, contacts.deleteContact);

router.put(
  "/:contactId",
  validation.isBodyEmpty,
  validation.isContactExist,
  joiValidate,
  contacts.updateContact
);

module.exports = router;
