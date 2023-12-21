import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createProfile} from "../../AC/profile";

class CreateProfile extends Component {
    static options =  [
        {key: 100, text: '* Select a professional status',  value : '-1'},
        {key: 1, text: 'Developer',  value : '1'},
        {key: 2, text: 'Junior',  value : '2'},
        {key: 3, text: 'Senior',  value : '3'},
        {key: 4, text: 'Manager',  value : '4'},
        {key: 5, text: 'Student',  value : '5'},
        {key: 6, text: 'Instructor',  value : '6'},
        {key: 7, text: 'Intern',  value : '7'},
        {key: 8, text: 'Other',  value : '8'}
    ];

    state  = {
        displaySocial: false,
        data: {
            handle: '', company: '', website: '',  location: '', status: '-1',
            skills: '', githubusername:'',   bio: '',
            twitter: '', facebook: '', linkedin: '', youtube: '',  instagram: ''
        },
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    toggleSocial = (e) =>  {
        e.preventDefault();
        this.setState(({displaySocial}) => ({displaySocial: !displaySocial}))
    }

    handleChange = (e, {name, value}) => this.setState({
        data: {...this.state.data, [name]: value},
        errors: {...this.state.errors, [name]: ''}
    })
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(parseInt(this.state.data.status) <= 0) {
            this.setState({
                errors: {...this.state.errors, status: 'invalid status'}
            })
            return;
        }
        this.props.createProfile(this.state.data, this.props.history)
    }
    
    render(){
        const {data, errors, displaySocial} = this.state;
		return(
			<Grid columns={16} centered>
                <Grid.Column width={14}>
                    <h2 className="text-center">Create Profile</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths="equal">

                            <Form.Input  error={!!errors.handle} name="handle" value={data.handle}
                                onChange={this.handleChange}
                                        placeholder="username"
                            />
                            <Form.Input error={!!errors.skills} name="skills" value={data.skills}
                                        onChange={this.handleChange}
                                        placeholder="skills"
                            />
                            <Form.Select error={!!errors.status} options={CreateProfile.options}
                                         name="status" value={data.status}
                                         onChange={this.handleChange}
                                         placeholder="status"
                                         search
                            />
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Input name="company" value={data.company}
                                        onChange={this.handleChange}
                                        placeholder="company"
                            />
                            <Form.Input name="website" value={data.website}
                                        onChange={this.handleChange}
                                        placeholder="website"
                            />
                            <Form.Input name="location" value={data.location}
                                        onChange={this.handleChange}
                                        placeholder="location"
                            />
                            <Form.Input name="githubuser" value={data.githubuser}
                                        onChange={this.handleChange}
                                        placeholder="githubuser"
                            />
                        </Form.Group>


                        <Form.TextArea name="bio" label="Bio"
                            value={data.bio} onChange={this.handleChange}
                        />



                        <Form.Button onClick={this.toggleSocial}  className="mt-3">Open social</Form.Button>

                        <div  style={{display: displaySocial ? 'block':'none'}} className="my-3">
                            <Form.Group widths="equal">
                                <Form.Input value={data.twitter}  onChange={this.handleChange}
                                            name="twitter" placeholder="Twitter"  icon="twitter" iconPosition="left"
                                />
                                <Form.Input value={data.facebook}  onChange={this.handleChange}  name="facebook"
                                            placeholder="Facebook"  icon="facebook" iconPosition="left"
                                />
                                <Form.Input value={data.youtube}  onChange={this.handleChange} name="youtube"
                                            placeholder="Youtube"  icon="youtube" iconPosition="left"
                                />
                                <Form.Input value={data.instagram}  onChange={this.handleChange} name="instagram"
                                            placeholder="Instagram"  icon="instagram" iconPosition="left"
                                />
                                <Form.Input value={data.github}  onChange={this.handleChange} name="github"
                                            placeholder="Github"  icon="github" iconPosition="left"
                                />
                            </Form.Group>
                        </div>

                         <Form.Field className="text-center">
                                <Form.Button color="red">Create Profile</Form.Button>
                         </Form.Field>
                    </Form>

                </Grid.Column>
			</Grid>
		);
	}
}
CreateProfile.propTypes = {
    loading: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    errors: PropTypes.object.isRequired,
};

CreateProfile.defaultProps = {
    profile: {}
}


export default connect(
    ({errors, userProfile}) => ({
        loading: userProfile.loading,
        profile: userProfile.profile,
        errors
    }),
    {createProfile}
)(withRouter(CreateProfile));