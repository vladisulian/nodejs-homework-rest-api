const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/auth");
const {
  alreadyRegistered,
  isUserExist,
  auth,
} = require("../../middleware/auth");

router.post("/register", alreadyRegistered, AuthControllers.register);

router.post("/login", isUserExist, AuthControllers.login);

router.post("/logout", auth, AuthControllers.logout);

router.get("/current", auth, AuthControllers.getCurrentUser);

module.exports = router;
