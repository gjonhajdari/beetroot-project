const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Get request handler for the './test' endpoint
router.get("/test", (req, res) => {
  res.json({
    msg: "Users works!",
  });
});

// POST request handler for the './request' endpoint
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200,
        r: "pg",
        default: "mm",
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw new Error(err);
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// POST request handler for the './login' endpoint
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found.";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatched) => {
      if (isMatched) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

// GET request handler for the '/current' endpoint
// passport.authenticate() is middleware provided by passport to authenticate incoming requests using the configured JWT strategy
// session: false specifies that the application does not use sessions for authentication
// req.user is populated by passport if the user is authenticated
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  }
);

module.exports = router;
