const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// --- Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize()); // Initializes passport
require("./config/passport")(passport); // Passing passport as an argument

app.get("/", (req, res) => {
  res.send("Hello");
});

// --- Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server running on port:", port);
});

const db = require("./config/keys").mongoUri;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
