const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/auth");
const {
  isUserExistOnRegister,
  isUserExistOnLogin,
  comparePassword,
} = require("../../controllers/handleValidations");

router.post("/register", isUserExistOnRegister, AuthControllers.register);

router.post(
  "/login",
  isUserExistOnLogin,
  comparePassword,
  AuthControllers.login
);

module.exports = router;
