
const register = (req, res, next) => {
  res.json({ message: "Register" });
};

const login = (req, res, next) => {
  res.json({ message: "Login" });
};

module.exports = {
  register,
  login,
};
