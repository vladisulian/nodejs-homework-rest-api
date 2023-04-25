const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/auth");
const { isUserExist } = require("../../controllers/handleValidations");

router.post("/register", isUserExist, AuthControllers.register);

router.post("/login", AuthControllers.login);

module.exports = router;
