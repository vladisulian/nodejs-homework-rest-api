const router = require("express").Router();

const AuthControllers = require("../../controllers/auth/auth");
const {
  alreadyRegistered,
  isUserExist,
  auth,
} = require("../../middleware/auth");
const { joiUser, joiSubscription } = require("../../models/user-joi");

router.post("/register", joiUser, alreadyRegistered, AuthControllers.register);

router.post("/login", joiUser, isUserExist, AuthControllers.login);

router.post("/logout", joiUser, auth, AuthControllers.logout);

router.get("/current", joiUser, auth, AuthControllers.getCurrentUser);

router.patch("/", auth, joiSubscription, AuthControllers.updateSubscription);

router.patch("/avatars", auth, AuthControllers.updateAvatar);

module.exports = router;
