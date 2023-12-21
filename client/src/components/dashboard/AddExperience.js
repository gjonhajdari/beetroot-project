import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Grid, Form, Checkbox} from 'semantic-ui-react'
import {DatePickerInput} from 'rc-datepicker';

import {getCurrentProfile, addExperience} from "../../AC/profile";
import './datepicker.css'


class AddExperience extends Component {

    state = {
        data: {
            company: '', title: '', location: '',
            from : '', to: '', current: false,
            description: ''
        },
        errors: {},
        disabled: false
    }


    componentDidMount() {
        this.props.getCurrentProfile()
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    handleChange = (e, {name, value}) => this.setState({
        data: {...this.state.data, [name]: value},
        errors: {...this.state.errors, [name]: ''}
    })

    toggleCurrent = (e, {name}) => this.setState(({data}) => ({
        data: {...data, [name]: !data[name]}
    }))
    
    handleSubmit = (e) => {
        e.preventDefault();
         this.props.addExperience(this.state.data, this.props.history)
    }

    render() {
        const {data, errors} = this.state;
        return (
            <Grid columns={16} centered>
                <Grid.Column width={14}>
                    <h2>Add Experience</h2>
                     <Form onSubmit={this.handleSubmit}>

                         <Form.Group widths="equal">

                             <Form.Input error={!!errors.company}   name="company"  value={data.company}
                                onChange={this.handleChange} placeholder="company"
                             />
                             <Form.Input error={!!errors.title} name="title"  value={data.title}
                                         onChange={this.handleChange} placeholder="title"
                             />
                             <Form.Input error={!!errors.location} name="location"  value={data.location}
                                         onChange={this.handleChange} placeholder="location"
                             />
                         </Form.Group>

                         <Form.Group widths="equal">
                              <DatePickerInput
                                  className={errors.from ? "border border-danger" : ""}
                                    displayFormat='DD-MM-YYYY'
                                    returnFormat='YYYY-MM-DD'
                                    defaultValue={new Date()}
                                    showOnInputClick
                                    placeholder="from"
                                    onChange={(jsDate, dateString) => this.setState({
                                        data: {...data, from: dateString
                                        }})}
                                />
                               <DatePickerInput
                                   className={errors.to ? "border border-danger" : ""}
                                   disabled={data.current}
                                     displayFormat='DD-MM-YYYY'
                                     returnFormat='YYYY-MM-DD'
                                     defaultValue={new Date()}
                                     showOnInputClick
                                     placeholder="from"
                                     onChange={(jsDate, dateString) => this.setState({
                                         data: {...data, to: dateString
                                         }})}
                                 />

                             <Checkbox label="current" className="ml-5"
                                name="current"  onChange={this.toggleCurrent} toggle
                             />

                         </Form.Group>
                         <Form.TextArea name="description"  value={data.description}
                                onChange={this.handleChange} placeholder="description"/>


                         <div className="my-3 text-center">
                        <Form.Button primary>Add Experience</Form.Button>
                         </div>
                     </Form>

                </Grid.Column>
            </Grid>

        )
    }
}

AddExperience.propTypes = {
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object,
    getCurrentProfile: PropTypes.func.isRequired,
    addExperience: PropTypes.func.isRequired,
}

AddExperience.defaultProps = {
    profile: {}
}

export default connect(
    ({errors, userProfile}) => ({
        loading: userProfile.loading,
        profile: userProfile.profile,
        errors
    }),
    {getCurrentProfile, addExperience}
)(
    withRouter(AddExperience)
);