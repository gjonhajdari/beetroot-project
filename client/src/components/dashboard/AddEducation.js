import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Form, Checkbox } from 'semantic-ui-react';
import { DatePickerInput } from 'rc-datepicker';
import { getCurrentProfile, addEducation } from '../../AC/profile';
import './datepicker.css';

class AddEducation extends Component {
  state = {
    data: {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      data: { ...this.state.data, [name]: value },
      errors: { ...this.state.errors, [name]: '' }
    });
  };

  toggleCurrent = (e, { name }) => {
    this.setState(prevState => ({
      data: { ...prevState.data, [name]: !prevState.data[name] }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addEducation(this.state.data, this.props.history);
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Grid columns={16} centered>
        <Grid.Column width={14}>
          <h2>Add Education</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                error={!!errors.school}
                name="school"
                value={data.school}
                onChange={this.handleChange}
                placeholder="School"
              />
              <Form.Input
                error={!!errors.degree}
                name="degree"
                value={data.degree}
                onChange={this.handleChange}
                placeholder="Degree"
              />
              <Form.Input
                error={!!errors.fieldofstudy}
                name="fieldofstudy"
                value={data.fieldofstudy}
                onChange={this.handleChange}
                placeholder="Field of Study"
              />
            </Form.Group>

            <Form.Group widths="equal">
              <DatePickerInput
                className={errors.from ? 'border border-danger' : ''}
                displayFormat="DD-MM-YYYY"
                returnFormat="YYYY-MM-DD"
                defaultValue={new Date()}
                showOnInputClick
                placeholder="From"
                onChange={(jsDate, dateString) =>
                  this.setState({
                    data: { ...data, from: dateString }
                  })
                }
              />
              <DatePickerInput
                className={errors.to ? 'border border-danger' : ''}
                disabled={data.current}
                displayFormat="DD-MM-YYYY"
                returnFormat="YYYY-MM-DD"
                defaultValue={new Date()}
                showOnInputClick
                placeholder="To"
                onChange={(jsDate, dateString) =>
                  this.setState({
                    data: { ...data, to: dateString }
                  })
                }
              />
              <Checkbox
                label="Current"
                className="ml-5"
                name="current"
                onChange={this.toggleCurrent}
                toggle
              />
            </Form.Group>

            <Form.TextArea
              name="description"
              value={data.description}
              onChange={this.handleChange}
              placeholder="Description"
            />

            <div className="my-3 text-center">
              <Form.Button primary>Add Education</Form.Button>
            </div>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

AddEducation.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired
};

AddEducation.defaultProps = {
  profile: {}
};

export default connect(
  ({ errors, userProfile }) => ({
    loading: userProfile.loading,
    profile: userProfile.profile,
    errors
  }),
  { getCurrentProfile, addEducation }
)(withRouter(AddEducation));
