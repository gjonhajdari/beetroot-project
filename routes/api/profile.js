const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateProfileInput = require("../../validation/profile");

router.get("/test", (req, res) => {
  res.json({
    msg: "Profile works!",
  });
});

// Endpoint for getting profile
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

// Endpoint for creating profile
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { isValid, errors } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};

  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername;
  }
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  profileFields.social = {};

  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      // Update the profile if it exists
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile));
    } else {
      // Create the profile if it doesn't exist
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        // Check if it handle already exists
        if (profile) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        }
        // Create the new profile
        new Profile(profileFields).save().then((profile) => res.json(profile));
      });
    }
  });
});

// Endpoint for getting profile from handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.profile = "Profile not found";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((error) => res.status(404).json(error));
});

// Endpoint for getting profile from userID
router.get("/user/:userID", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.userID })
    .populate("user", ["name", "avatar"])
    .then((user) => {
      if (!user) {
        errors.user = "User not found";
        return res.status(404).json(errors);
      }
      res.json(user);
    })
    .catch((error) => res.status(404).json(error));
});

module.exports = router;
