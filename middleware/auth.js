const User = require("../models/user");
const jwt = require("jsonwebtoken");
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
      return res.status(401).json({ message: "No token provided." });
    }

    const [bearer, token] = authHeader.split(" ", 2);

    if (bearer !== "Bearer") {
      console.log("[AUTH]: No bearer".yellow);
      return res.status(401).json({ message: "No token provided." });
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

module.exports = { auth, alreadyRegistered, isUserExist };
