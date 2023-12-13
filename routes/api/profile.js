const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => {
  res.json({
    msg: "Profile works!",
  });
});

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "Profile not found";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((error) => res.status(404).json(error));
});

module.exports = router;
