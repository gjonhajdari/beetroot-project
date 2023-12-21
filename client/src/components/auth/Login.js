import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Button } from 'semantic-ui-react'
import Validator from 'validator';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import InlineError from './InlineError'
import { userLogin } from "../../AC/auth";


class Login extends Component {
    state = {
        data: {
            email: '', password: ''
        },
        loading: false,
        isAuth: false,
        errors: {}
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAuth) {
            return {
                errors: {},
                isAuth: true
            }
        }
        if (Object.keys(props.errors).length) {

            if (!Object.keys(state.errors).length) {
                // if not errors yet  set state errors 
                return {
                    errors: props.errors
                }
            }
            const tempErrors = {};
            for (let key in props.errors) {
                if (props.errors[key] === state.errors[key]) {
                    tempErrors[key] = props.errors[key];
                }
            }
            return {
                errors: tempErrors
            }
        }
        return null;
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    onChange = ({ target }) => this.setState({
        data: { ...this.state.data, [target.name]: target.value },
        errors: { ...this.state.errors, [target.name]: '' }
    })

    validate = (data) => {
        const errors = {}
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email"
        if (!data.password) errors.password = "Fill field passowrd";
        return errors;
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { errors } = this.state;
        errors = this.validate(this.state.data)
        this.setState({ errors })
        if (Object.values(errors).some(el => el.length > 0)) {
            return;
        }
        this.props.userLogin(this.state.data)
        this.setState({
            data: { ...this.state.data, email: '', password: '' }
        })
    }



    render() {
        const { data, errors, isAuth } = this.state;
        if (isAuth) {
            this.props.history.push('/dashboard');
            return null;
        }
        return (
            <div className="ui container">
                <Grid centered columns={2}>
                    <Grid.Column>
                        <h1>Login</h1>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Field error={!!errors.email}>
                                <label htmlFor="email">Email  {errors.email && <InlineError text={errors.email} />}  </label>
                                <input type="text" name="email"
                                    value={data.email}
                                    onChange={this.onChange}
                                />
                            </Form.Field>

                            <Form.Field error={!!errors.password}>
                                <label htmlFor="password">Password  {errors.password && <InlineError text={errors.password} />}</label>
                                <input type="text" name="password"
                                    value={data.password}
                                    onChange={this.onChange}
                                />
                            </Form.Field>
                            <Button primary>Login</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(
    ({ errors, auth, login }) => ({
        errors,
        isAuth: auth.isAuth,
        loading: login.loading
    }),
    { userLogin }
)(withRouter(Login));