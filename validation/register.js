const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

  // Name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field cannot be empty";
  }

  // Email
  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field cannot be empty";
  }

  // Password
  if (!validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = "Password must be between 8 and 20 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field cannot be empty";
  }

  // Confirm password
  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords must match";
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
