const contacts = require("../models/contacts");
const { Contact } = require("../models/contacts");

async function isContactWithSameProps(req, res, next) {
  const { name, email, phone } = req.body;

  const existedContact = await Contact.findOne({ name, email, phone });

  if (existedContact) {
    res.status(400).json({ message: "Contact is already exist!" });
    console.error(`Contact is already exist!`.red);
    return;
  }

  // if (contact) {
  //   res.status(400).json({ message: "Contact is already exist!" });
  //   console.error(`Contact is already exist!`.red);
  //   return;
  // }
  next();
}

async function isContactExist(req, res, next) {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (!contact || contact === undefined) {
    return res.status(404).json({ message: "Not found" });
  }

  next(); // вызываем следующий middleware или обработчик маршрута

  return contact;
}

function isFavoriteInBody(req, res, next) {
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.send({ message: "Missing field favorite" });
    console.error(`Missing field favorite. Favorite is ${favorite}gi`.red);
    return;
  }

  next();
}

function isBodyEmpty(req, res, next) {
  const bodyIsEmpty = Object.keys(req.body).length === 0;
  if (bodyIsEmpty) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  next();
}

module.exports = {
  isContactWithSameProps,
  isContactExist,
  isBodyEmpty,
  isFavoriteInBody,
};
