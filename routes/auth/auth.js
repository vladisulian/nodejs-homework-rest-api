const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/auth");
const {
  isUserExistOnRegister,
  isUserExistOnLogin,
} = require("../../middleware/auth");

router.post("/register", isUserExistOnRegister, AuthControllers.register);

router.post("/login", isUserExistOnLogin, AuthControllers.login);

module.exports = router;
