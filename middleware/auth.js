const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
require("colors");

async function alreadyRegistered(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user !== null) {
      return res.status(409).json({ message: "Email in use" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function verifyUserExist(req, res, next) {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken: verificationToken });

    if (!user) {
      res.status(404).json({ message: "Not found" });
    }

    req.user = { id: user._id }; // ? write user id to request for parsing in verify controller

    next();
  } catch (error) {
    console.error(error);
  }
}

async function isUserExist(req, res, next) {
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
      console.log("[AUTH]: No authorization header".yellow);
      return res.status(401).json({ message: "Not authorized" });
    }

    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer") {
      console.log("[AUTH]: No bearer".yellow);
      return res.status(401).json({ message: "Not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("[AUTH]: Error with verifying token".yellow);
        return res.status(401).json({ message: "Invalid token" });
      }

      const currentUser = await User.findById(decoded.id);

      if (currentUser && currentUser.token === token) {
        req.user = decoded;
        return next();
      }
      return res.status(401).json({ message: "Not authorized" });
    });
  } catch (error) {
    console.error(`${error}`.red);
  }
}

async function jimpSaving(req, res, next) {
  const savingPath = path.join(
    __dirname,
    "..",
    "public",
    "avatars",
    req.avatar.hashedName
  );

  await Jimp.read(req.file.path)
    .then((avatar) => {
      return avatar.resize(200, 200).write(savingPath, () => {
        // ? this anon func is needed because it's a callback slot
        next();
      });
    })
    .catch((err) => console.error(`${err}`.red));
}

const deleteTmpAvatar = (req, res, next) => {
  // "file" is going from multer package in routes/auth
  const file = req.avatar.hashedName;

  const dirPath = path.join(__dirname, "..", "tmp");
  const filePath = path.join(dirPath, file);

  fs.unlink(filePath, (err, stat) => {
    if (err) {
      console.error(`${err}`.red);
      return;
    }
  });
  console.log(`File ${file} from ${dirPath} is successfully removed.`.yellow);
  next();
};

module.exports = {
  auth,
  alreadyRegistered,
  isUserExist,
  verifyUserExist,
  jimpSaving,
  deleteTmpAvatar,
};
