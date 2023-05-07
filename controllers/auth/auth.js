const User = require("../../models/user");
const sendEmail = require("../../helpers/mailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
// const Jimp = require("jimp");
// const path = require("path");
require("colors");

const register = (req, res, next) => {
  try {
    const { email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return next(err);

        const user = {
          email,
          password: hash,
          verificationToken: crypto.randomUUID(),
          avatarURL: gravatar.url(email, { s: "200", r: "pg", d: "mp" }), // avatar generated dynamically with gravatar, where d - default, r - rating
        };

        sendEmail(email, user.verificationToken);

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

const sendAdditionalVerificationMail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const verificationToken = req.user.verificationToken;

    await sendEmail(email, verificationToken);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error(`${error}`.red);
  }
};

const login = (req, res, next) => {
  try {
    const password = req.body.password; //* take a password from the request body
    const userPassword = req.user.password; //* take a password from the user, stored on the past middleware
    const userVerify = req.user.verify; //* take an verify status fro mthe user

    if (userVerify === false) {
      req.status(400).json({ message: "Not verified." });
    }
    bcrypt.compare(password, userPassword, async (err, result) => {
      if (err) return next(err);

      if (result === false) {
        return res.status(401).json({ error: "Email or password is wrong." });
      }

      const token = jwt.sign(
        { id: req.user._id }, // hashed id
        process.env.JWT_SECRET, // secret password
        { expiresIn: "12h" } // life-time of the token
      );

      req.user.token = token;

      await User.findByIdAndUpdate(req.user.id, req.user); // set the token

      res.status(200).json({
        token: req.user.token,
        user: {
          email: req.user.email,
          subscription: req.user.subscription || "starter",
        },
      });
    });
  } catch (error) {
    console.error(`${error}`.red);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }); // set the token

    res.status(204).end();
  } catch (error) {
    console.error(`${error}`.red);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user.id);
    res.json({ email: userInfo.email, subscription: userInfo.subscription });
  } catch (error) {
    console.log(`${error}`.red);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const userID = req.user.id;

    await User.findByIdAndUpdate(userID, req.body);

    const updatedContact = await User.findById(userID);

    res.send(updatedContact);
  } catch (error) {
    console.error(`${error}`.red);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const avatarURL = "avatars/" + req.file.filename;

    await User.findByIdAndUpdate(userID, { avatarURL });

    return res.status(200).json({ avatarURL });
  } catch (error) {
    console.error(`${error}`.red);
    return res.status(401).json({ error: "Not authorized" });
  }
};

const verify = async (req, res, next) => {
  try {
    const { token } = req.params;
    const userID = req.user.id;

    await User.findByIdAndUpdate(userID, {
      verificationToken: null,
      verify: true,
    });

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error(`${error}`.red);
  }
};

module.exports = {
  register,
  sendAdditionalVerificationMail,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verify,
};
