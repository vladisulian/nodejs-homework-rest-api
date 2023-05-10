const router = require("express").Router();

const path = require("path");
const { existsSync } = require("fs");
const { mkdir } = require("fs/promises");
const crypto = require("crypto");

const AuthControllers = require("../../controllers/auth/auth");
const {
  alreadyRegistered,
  isUserExist,
  auth,
  jimpSaving,
  deleteTmpAvatar,
} = require("../../middleware/auth");
const { joiUser, joiSubscription } = require("../../models/user-joi");

const multer = require("multer");

const tmpDir = async (req, file, cb) => {
  const directory = path.join(__dirname, "..", "..", "tmp");
  const directoryExist = existsSync(directory);

  //* cb - callback. The second argument - returning value
  if (!directoryExist) {
    await mkdir(directory);
    return cb(null, directory);
  }

  cb(null, directory);
};
const storage = multer.diskStorage({
  destination: tmpDir, // ? avatars saving directory
  filename: (req, file, cb) => {
    const hash = crypto.randomUUID(); // ? create an unique hash
    const ext = path.extname(file.originalname); // ? take an extension
    const basename = path.basename(file.originalname, ext); // ? take a file basename

    const hashedName = basename + "-" + hash + ext;
    req.avatar = { hashedName }; // ? saving hashedName to req.avatar to use it on updateAvatar controller
    cb(null, hashedName); // ? cb - callback. Just write like this
  },
});

const upload = multer({ storage });

router.post("/register", joiUser, alreadyRegistered, AuthControllers.register);

router.post("/login", joiUser, isUserExist, AuthControllers.login);

router.post("/logout", joiUser, auth, AuthControllers.logout);

router.get("/current", joiUser, auth, AuthControllers.getCurrentUser);

router.patch("/", auth, joiSubscription, AuthControllers.updateSubscription);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  jimpSaving,
  deleteTmpAvatar,
  AuthControllers.updateAvatar
);

module.exports = router;
