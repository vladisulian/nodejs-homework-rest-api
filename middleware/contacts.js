const Contact = require("../models/contacts");

require("colors");

async function isContactWithSameProps(req, res, next) {
  const { name, email, phone } = req.body;

  const existedContact = await Contact.findOne({ name, email, phone });

  if (existedContact) {
    res.status(400).json({ message: "Contact is already exist!" });
    console.error(`Contact is already exist!`.red);
    return;
  }

  next();
}

async function isContactExist(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact || contact === undefined) {
      return res.status(404).json({ message: "Not found" });
    }

    next(); // вызываем следующий middleware или обработчик маршрута

    return contact;
  } catch (error) {
    console.error(`${error.message}`.red);
    return res.status(500).json({ error: "Internal server error" });
  }
}

function isFavoriteInBody(req, res, next) {
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.status(400).json({ message: "Missing field favorite" });
    console.error(`Missing field favorite. Favorite is ${favorite}`.red);
    return;
  }

  next();
}

function isBodyEmpty(req, res, next) {
  const bodyIsEmpty = Object.keys(req.body).length === 0;
  if (bodyIsEmpty) {
    res.status(400).json({ message: "Missing required name field" });
    return;
  }
  next();
}

function isAllRequiredFieldsExist(req, res, next) {
  const body = req.body;
  const { name, email, phone } = body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  next();
}

module.exports = {
  isContactWithSameProps,
  isContactExist,
  isBodyEmpty,
  isFavoriteInBody,
  isAllRequiredFieldsExist,
};
