import React, { Component } from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";

class UserPanel extends Component {
  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"));
  };

  render() {
    return (
      <div>
        <Grid style={{ background: "#4c3c4c" }}>
          <Grid.Column>
            <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
              {/* Main App Header */}
              <Header inverted floated="left" as="h2">
                <Icon name="lightning" />
                <Icon name="envelope" />
                <Icon name="lightning" />
              </Header>
              <Header inverted floated="left" as="h2">
                <Header.Content>Chat Fast</Header.Content>
              </Header>
            </Grid.Row>
            {/* User Dropdown */}
            <br />
            <br />
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={<span>User</span>}
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserPanel;
