const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

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

// Endpoint for creating and updating profile
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
    .then((profile) => res.json(profile))
    .catch((error) =>
      res.status(404).json({
        profile: "Profile not found",
      })
    );
});

// Endpoint for getting profile from userID
router.get("/user/:userID", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.userID })
    .populate("user", ["name", "avatar"])
    .then((user) => res.json(user))
    .catch((error) =>
      res.status(404).json({
        user: "User not found",
      })
    );
});

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => res.json(profiles))
    .catch((error) =>
      res.status(404).json({
        profiles: "No profiles found",
      })
    );
});

// Endpoint for adding experience to profiles
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const experienceFields = {};

    if (req.body.title) experienceFields.title = req.body.title;
    if (req.body.company) experienceFields.company = req.body.company;
    if (req.body.location) experienceFields.location = req.body.location;
    if (req.body.from) experienceFields.from = req.body.from;
    if (req.body.to) experienceFields.to = req.body.to;
    if (req.body.current) experienceFields.current = req.body.current;
    if (req.body.description) experienceFields.description = req.body.description;

    Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: {
          experience: {
            $each: [experienceFields],
            $position: 0,
          },
        },
      },
      { new: true }
    )
      .then((profile) => {
        if (profile) {
          res.json(profile);
        } else {
          errors.profile = "Profile not found";
          res.status(404).json(errors);
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

// Endpoint for adding education to profiles
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const educationFields = {};

    if (req.body.school) educationFields.school = req.body.school;
    if (req.body.degree) educationFields.degree = req.body.degree;
    if (req.body.fieldofstudy) educationFields.fieldofstudy = req.body.fieldofstudy;
    if (req.body.from) educationFields.from = req.body.from;
    if (req.body.to) educationFields.to = req.body.to;
    if (req.body.current) educationFields.current = req.body.current;
    if (req.body.description) educationFields.description = req.body.description;

    Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: {
          education: {
            $each: [educationFields],
            $position: 0,
          },
        },
      },
      { new: true }
    )
      .then((profile) => {
        if (profile) {
          res.json(profile);
        } else {
          errors.profile = "Profile not found";
          res.status(404).json(errors);
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
);

// Endpoint for deleting education from ID
router.delete(
  "/education/:educationID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.profile = "Profile not found";
        return res.status(404).json(errors);
      }

      const removeIndex = profile.education
        .map((edu) => edu.id)
        .indexOf(req.params.educationID);

      if (removeIndex === -1) {
        errors.education = "Education not found";
        res.status(404).json(errors);
      }

      profile.education.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((error) => res.status(404).json(error));
    });
  }
);

// Endpoint for deleting experience from ID
router.delete(
  "/experience/:experienceID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.profile = "Profile not found";
        return res.status(404).json(errors);
      }

      const removeIndex = profile.experience
        .map((exp) => exp.id)
        .indexOf(req.params.experienceID);

      if (removeIndex === -1) {
        errors.experience = "Experience not found";
        res.status(404).json(errors);
      }

      profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => res.json(profile))
        .catch((error) => res.status(500).json(error));
    });
  }
);

// Endpoint for deleting profile and user
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndDelete({ user: req.user.id }).then(() => {
    User.findOneAndDelete({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  });
});

module.exports = router;
