const User = require("../../Schemas/user");
const bcrypt = require("bcrypt");

require("colors");

const register = async (req, res, next) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      console.log(salt);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        console.log("hash", hash);

        return res.end();
      });
    });

    await User.create(user);

    return res.status(201).json(user);
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
