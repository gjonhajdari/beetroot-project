import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "./dashboard.css";

const ProfileActions = () => (
  <div className="text-center actions">
    <NavLink to="/edit-profile">
      <Icon name="user circle" />
      Edit Profile
    </NavLink>
    <NavLink to="/add-experience">
      <Icon name="cubes" />
      Add Experience
    </NavLink>
    <NavLink to="/add-education">
      <Icon name="student" />
      Add Education
    </NavLink>
  </div>
);
export default ProfileActions;
