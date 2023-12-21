
import React from 'react';
import {NavLink} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

const ProfileActions = () => (
        <div className="text-center py-3">
            <NavLink className="mr-5" to="/edit-profile">Edit Profile <Icon name="user circle"/></NavLink>
            <NavLink  className="mr-5" to="/add-experience">Add Experience <Icon name="cubes"/></NavLink>
            <NavLink to="/add-education">Add Education <Icon name="student"/></NavLink>
        </div>
)
export default ProfileActions;