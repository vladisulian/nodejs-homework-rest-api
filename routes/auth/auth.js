const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/auth");

router.post("/register", AuthControllers.register);

router.post("/login", AuthControllers.login);

module.exports = router;
