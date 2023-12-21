import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Card, Image, Icon, Table, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { getCurrentProfile, deleteAccount } from "../../AC/profile";
import { deleteExperience } from "../../AC/profile";
import { deleteEducation } from "../../AC/profile";
import Spinner from "../common/Spinner";
import isEmpty from "../../utils/isEmpty";
import ProfileActions from "./ProfileActions";
import formatDate from "../../utils/formatDate";

class Dashboard extends Component {
  static statuses = [
    { key: 100, text: "* Select a professional status", value: "-1" },
    { key: 1, text: "Developer", value: "1" },
    { key: 2, text: "Junior", value: "2" },
    { key: 3, text: "Senior", value: "3" },
    { key: 4, text: "Manager", value: "4" },
    { key: 5, text: "Student", value: "5" },
    { key: 6, text: "Instructor", value: "6" },
    { key: 7, text: "Intern", value: "7" },
    { key: 8, text: "Other", value: "8" },
  ];

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  createProfileRender = () => (
    <div className="text-center">
      <NavLink to="/create-profile">Create profile</NavLink>
    </div>
  );

  removeEl = (id) => {
    console.log(id);
    this.props.deleteExperience(id);
  };

  removeEd = (id) => {
    console.log(id);
    this.props.deleteEducation(id);
  };

  renderProfileBody = () => {
    const { user, profile } = this.props;
    const userStatus = Dashboard.statuses.find(
      (el) => parseInt(el.value) === parseInt(profile.status)
    );
    return (
      <Grid>
        <Grid.Column width={7}>
          <Card fluid>
            <Card.Content>
              <Image floated="right" avatar src={user.avatar} size="huge" />
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>
                {userStatus && userStatus.text
                  ? userStatus.text
                  : "Status Unavailable"}
              </Card.Meta>
              <Card.Description>{profile.bio}</Card.Description>
            </Card.Content>
            <Card.Content>
              <ProfileActions />
            </Card.Content>
            <Card.Content textAlign="center">
              <Button
                color="orange"
                className="mt-5"
                size="large"
                onClick={this.props.deleteAccount}
              >
                Delete account
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>

        <Grid.Column width={9}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {profile.experience
                .sort((a, b) => a.from - b.to)
                .map((el) => (
                  <Table.Row>
                    <Table.Cell>{formatDate(new Date(el.from))}</Table.Cell>
                    <Table.Cell>{formatDate(new Date(el.to))}</Table.Cell>
                    <Table.Cell>{el.company}</Table.Cell>
                    <Table.Cell>{el.title}</Table.Cell>
                    <Table.Cell onClick={() => this.removeEl(el._id)}>
                      <Icon name="trash" link />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column width={9}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
                <Table.HeaderCell>School</Table.HeaderCell>
                <Table.HeaderCell>Field Of Study</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {profile.education
                .sort((a, b) => a.from - b.to)
                .map((ed) => (
                  <Table.Row>
                    <Table.Cell>{formatDate(new Date(ed.from))}</Table.Cell>
                    <Table.Cell>{formatDate(new Date(ed.to))}</Table.Cell>
                    <Table.Cell>{ed.school}</Table.Cell>
                    <Table.Cell>{ed.fieldofstudy}</Table.Cell>
                    <Table.Cell onClick={() => this.removeEd(ed._id)}>
                      <Icon name="trash" link />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    const { loading, user, profile } = this.props;
    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="ui container">
        {isEmpty(profile) ? this.createProfileRender() : this.renderProfileBody()}
      </div>
    );
  }
}

export default connect(
  ({ auth, userProfile }) => ({
    isAuth: auth.isAuth,
    user: auth.user,
    loading: userProfile.loading,
    profile: userProfile.profile,
  }),
  { getCurrentProfile, deleteAccount, deleteExperience, deleteEducation }
)(Dashboard);
