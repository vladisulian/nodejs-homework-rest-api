const User = require("../../Schemas/user");
const bcrypt = require("bcrypt");

require("colors");

const register = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return next(err);

        const user = { name, email, password: hash };

        User.create(user);

        return res.status(201).json(user);
      });
    });
  } catch (error) {
    console.error(`${error}`.red);

    return res.status(500).json({ error: "Something went wrong..." });
  }
};

const login = (req, res, next) => {
  res.json({ message: "Login" });
};

module.exports = {
  register,
  login,
};
