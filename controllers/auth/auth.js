const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("colors");

const register = (req, res, next) => {
  try {
    const { email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return next(err);

        const user = { email, password: hash };

        User.create(user);

        return res.status(201).json({
          user: {
            email: user.email,
            subscription: user.subscription || "starter",
          },
        });
      });
    });
  } catch (error) {
    console.error(`${error}`.red);

    return res.status(500).json({ error: "Something went wrong..." });
  }
};

const login = (req, res, next) => {
  const password = req.body.password; //* take a password from the request body
  const userPassword = req.user.password; //* take a password from the user, stored on the past middleware

  bcrypt.compare(password, userPassword, (err, result) => {
    if (err) return next(err);

    if (result === false) {
      return res.status(401).json({ error: "Email or password is wrong." });
    }

    const token = jwt.sign(
      { id: req.user._id }, // hashed id
      process.env.JWT_SECRET, // secret password
      { expiresIn: "1h" } // life-time of the token
    );
    res
      .status(200)
      .json({
        token,
        user: {
          email: req.user.email,
          subscription: req.user.subscription || "starter",
        },
      });
    // console.log("The password is correct! ==>".yellow, result);
  });
};

module.exports = { register, login };
