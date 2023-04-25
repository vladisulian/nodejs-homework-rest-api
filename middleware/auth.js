const User = require("../Schemas/user");
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

module.exports = { isUserExistOnRegister, isUserExistOnLogin };
