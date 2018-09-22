import React, { Component } from "react";
import firebase from "../../firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
  };

  // This is a good start, but error checking can be more robust

  // You can structure this differently like in a previous app to display different error messages
  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "You must fill out all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      // throw error
      // error = { message: "Passwords do not match" };
      error = { message: "Password invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      // form valid
      return true;
    }
  };

  // Might want to handle validation differently maybe with passport
  // In the functioning app you NEVER want to store clear text pws
  isPasswordValid = ({ password, passwordConfirmation }) => {
    // This is a firebase requirement
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    // length of 0 will return true signifing the form is empty
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message} </p>);

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                // You'll probably want to redirect on submit
                // this.setState({ loading: false });
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        {/* Eventually you can add some css to make it responsive. Flexbox would do well here. */}
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="black" textAlign="center">
            <Icon
              name="envelope"
              color="orange"
              style={{ display: "inline", marginLeft: "0px" }}
            />
            <Icon
              name="forward"
              color="orange"
              style={{
                display: "inline",
                marginLeft: "30px",
                marginRight: "5px"
              }}
            />
            <Icon
              name="shipping fast"
              color="orange"
              style={{ display: "inline", marginLeft: "10px" }}
            />
            <br />
            <Icon
              name="lightning"
              color="yellow"
              style={{ display: "inline", marginRight: "90px" }}
            />
            {/* Eventually you could make a logo */}
            Chat Fast
            <Icon
              name="lightning"
              color="yellow"
              style={{ display: "inline", marginLeft: "90px" }}
            />
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <h2>Register</h2>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                // You should probably have a check if a username already exists
                //className={this.handleInputError(errors, "username")}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                fluid
                color="green"
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message style={{ display: "flex" }}>
            <div style={{ flexGrow: "1", flexShrink: "1", flexBasis: "0" }}>
              Already a user? <Link to="/login">Login</Link>
            </div>
            <div style={{ flexGrow: "1", flexShrink: "1", flexBasis: "0" }}>
              {/* You'll have to make a guest.js in auth */}
              Want to try it out? <Link to="/guest">Guest</Link>
            </div>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
