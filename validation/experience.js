const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // Title
  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  // Company
  if (validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  // Date
  // if (!validator.isDate(data.from)) {
  //   errors.from = "Please enter a valid date";
  // }

  if (validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
