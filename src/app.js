const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/auth/auth");
const contactsRouter = require("./routes/api/contacts.js");

const authMiddleware = require("./middleware/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //* Body parser middleware

app.use("/users", authRoutes); // if request path including '/auth' then authRoutes will be connected

app.use("/avatars", express.static(path.join(__dirname, "public", "avatars"))); //* on '/avatars/filename.ext' display chosen avatar

app.use("/api/contacts", authMiddleware.auth, contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
