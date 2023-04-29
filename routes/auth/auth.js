const router = require("express").Router();

const path = require("path");
const crypto = require("crypto");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (__, ___, cb) {
    cb(null, path.join(__dirname, "..", "..", "public", "avatars"));
  },
  filename: function (__, file, cb) {
    const uniqueSuffix = crypto.randomUUID();
    const extention = path.extname(file.originalname); // .png
    const basename = path.basename(file.originalname, extention);

    cb(null, basename + "-" + uniqueSuffix + extention);
  },
});

const upload = multer({ storage });

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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  AuthControllers.updateAvatar
);

module.exports = router;
