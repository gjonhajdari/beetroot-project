const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // Handle
  if (!validator.isLength(data.handle, { min: 2, max: 32 })) {
    errors.handle = "Handle needs to be between 2 and 32 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle field is required";
  }

  // Status
  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  // Skills
  if (validator.isEmpty(data.skills)) {
    errors.status = "Skills field is required";
  }

  // Social
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Please enter a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Please enter a valid URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Please enter a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Please enter a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Please enter a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Please enter a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
