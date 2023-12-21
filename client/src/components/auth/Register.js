import React, { Component } from "react";
import { Grid, Form, Button } from "semantic-ui-react";
import Validator from "validator";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InlineError from "./InlineError";
import { userRegister } from "../../AC/auth";

class Register extends Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    loading: false,
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.errors).length) {
      if (!Object.keys(state.errors).length) {
        // if not errors yet  set state errors
        return {
          errors: props.errors,
        };
      }
      const tempErrors = {};
      for (let key in props.errors) {
        if (props.errors[key] === state.errors[key]) {
          tempErrors[key] = props.errors[key];
        }
      }
      return {
        errors: tempErrors,
      };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  validate = (data) => {
    const errors = {};
    if (Validator.isEmpty(data.name)) errors.name = "Can not be blank";
    if (Validator.isEmpty(data.password)) errors.password = "Can not be blank";

    if (!Validator.isEmail(data.email)) errors.email = "Invalid format";

    if (!Validator.isLength(data.password, { min: 5, max: 20 }))
      errors.password = "Must be between 5 and 20 characters";
    if (!Validator.isLength(data.passwordConfirm, { min: 5, max: 20 }))
      errors.passwordConfirm = "Must be between 5 and 20 characters";
    return errors;
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.props.userRegister(this.state.data, this.props.history);
  };

  handleChange = ({ target }) => {
    this.setState({
      data: { ...this.state.data, [target.name]: target.value },
      errors: { ...this.state.errors, [target.name]: "" },
    });
  };

  render() {
    const { data, errors } = this.state;
    const propErrors = this.props.errors;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1>Register</h1>

          <Form onSubmit={this.onSubmit}>
            <Form.Field error={!!errors.name}>
              <label htmlFor="name">
                Name {errors.name && <InlineError text={errors.name} />}
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field error={!!errors.email}>
              <label htmlFor="email">
                Email {errors.email && <InlineError text={errors.email} />}{" "}
              </label>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field error={!!errors.password}>
              <label htmlFor="password">
                Password
                {errors.password && <InlineError text={errors.password} />}
              </label>
              <input
                type="text"
                name="password"
                value={data.password}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field error={!!errors.passwordConfirm}>
              <label htmlFor="password">
                Confirm Password
                {errors.passwordConfirm && (
                  <InlineError text={errors.passwordConfirm} />
                )}
              </label>
              <input
                type="text"
                name="passwordConfirm"
                value={data.passwordConfirm}
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Button primary>Register</Button>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  ({ auth, errors }) => ({
    isAuth: auth.isAuth,
    loading: auth.loading,
    errors,
  }),
  { userRegister }
)(withRouter(Register));
