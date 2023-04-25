const User = require("../Schemas/user");
const Contact = require("../Schemas/contacts");

const bcrypt = require("bcrypt");

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

async function isUserExistOnRegister(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user !== null) {
      return res.status(409).json({ error: "User is already exist" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function isUserExistOnLogin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.user = user; //* store user in the request body
  } catch (error) {
    console.error(`${error}`.red);
    return res.status(500).json({ error: "Internal server error" });
  }
  next();
}
async function comparePassword(req, res, next) {
  const password = req.body.password; //* take a password from the request body
  const userPassword = req.user.password; //* take a password from the user, stored on the past middleware

  bcrypt.compare(password, userPassword, (err, result) => {
    if (err) return next(err);

    if (result === false) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ token: "TOKEN" });

    console.log("The password is correct! ==>".yellow, result);
    res.end();
  });
}

module.exports = {
  isContactWithSameProps,
  isContactExist,
  isBodyEmpty,
  isFavoriteInBody,
  isAllRequiredFieldsExist,
  isUserExistOnRegister,
  isUserExistOnLogin,
  comparePassword,
};
