const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
