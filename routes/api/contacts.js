const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const validation = require("../../controllers/handleValidations");

require("colors");

router.get("/", contacts.getAll);

router.get("/:contactId", validation.isContactExist, contacts.getById);

router.post("/", validation.isContactWithSameProps, contacts.addContact);

router.delete("/:contactId", validation.isContactExist, contacts.deleteContact);

router.put(
  "/:contactId",
  validation.isBodyEmpty,
  validation.isContactExist,
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validation.isFavoriteInBody,
  validation.isContactExist,
  contacts.updateFavoriteStatus
);

module.exports = router;
