const User = require("../../Schemas/user");
require("colors");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = { name, email, password };

    console.log(req.body);

    await User.create(user);

    res.status(201).end(user);
  } catch (error) {
    console.error(`${error}`.red);

    return res.status(409).json({ message: error.message });
  }
};

const login = (req, res, next) => {
  res.json({ message: "Login" });
};

module.exports = {
  register,
  login,
};
