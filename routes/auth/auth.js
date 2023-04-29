const router = require("express").Router();

const path = require("path");
const crypto = require("crypto");

const multer = require("multer");

const tmpDir = path.join(__dirname, "..", "..", "tmp");
const storage = multer.diskStorage({
  destination: (__, ___, cb) => cb(null, tmpDir), // ? cb arguments: errorHandler, avatars saving directory
  filename: (__, file, cb) => {
    const uniqueSuffix = crypto.randomUUID(); // ? create a unique hash
    const extension = path.extname(file.originalname); // ? take an extension
    const basename = path.basename(file.originalname, extension); // ? take a file basename

    cb(null, basename + "-" + uniqueSuffix + extension); // ? cb - callback. Just write like this
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
