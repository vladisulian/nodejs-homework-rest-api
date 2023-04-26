const User = require("../models/user");
require("colors");

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
      return res.status(401).json({ error: "Email or password is wrong." });
    }

    req.user = user; //* store user in the request body
  } catch (error) {
    console.error(`${error}`.red);
    return res.status(500).json({ error: "Internal server error" });
  }
  next();
}

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided." });
    }
    next();
  } catch (error) {
    console.error(`${error}`.red);
  }
}

module.exports = { auth, isUserExistOnRegister, isUserExistOnLogin };
