const contacts = require("../models/contacts");

async function isContactWithSameProps(req, res, next) {
  const { email, phone } = req.body;
  const contactsList = await contacts.listContacts();
  const contact = Object.values(contactsList).some(
    (contact) =>
      [contact.email, contact.phone].includes(email) ||
      [contact.email, contact.phone].includes(phone)
  );

  if (contact) {
    res.status(400).json({ message: "Contact already exist" });
    return;
  }
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
  // req.contact = contact; // сохраняем найденный контакт в объекте запроса
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
};
