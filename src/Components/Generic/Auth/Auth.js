import React, { Component } from "react";

import {
  Form,
  Modal,
  Menu,
  Segment,
  Grid,
  Button,
  Divider
} from "semantic-ui-react";
import Router from "next/router";

import {
  signinHandler,
  signupHandler
} from "./../../../Requests/Authentication";

class Auth extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    shouldOpen: true,
    formType: this.props.authOption
  };

  tabSwitchHandler = tabKey => {
    this.setState({ formType: tabKey });
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  renderEmailField = isSignup => {
    if (isSignup) {
      return (
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="pskanade@gmail.com"
            name="email"
            value={this.state.email}
            onChange={event => this.changeHandler(event)}
          />
        </Form.Field>
      );
    } else {
      return null;
    }
  };

  renderAuthForm = () => {
    const isSignup = this.state.formType === "signup" ? true : false;

    return (
      <Grid stackable>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Form onSubmit={this.handleAuthentication} size="large">
              <Form.Field>
                <label>User Name</label>
                <input
                  placeholder="pskanade"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={event => this.changeHandler(event)}
                />
              </Form.Field>
              {this.renderEmailField(isSignup)}
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={event => this.changeHandler(event)}
                />
              </Form.Field>
              <Divider hidden />
              <Form.Button type="submit" size="large" color="violet" fluid>
                {isSignup ? "Sign Up" : "Sign In"}
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  render() {
    console.log(
      "[Auth.js] render\n-------------------------------------------"
    );
    return (
      <div>
        <Modal
          size="tiny"
          dimmer="blurring"
          open={this.state.shouldOpen}
          closeOnDimmerClick={false}
          closeOnEscape={false}
          onClose={this.close}
          centered>
          <Modal.Header as={"div"}>
            <text>
              {this.state.formType === "signin"
                ? "Sign in to your account"
                : "Create your new account"}
            </text>
            <Button
              icon="close"
              floated="right"
              color="red"
              basic
              onClick={this.props.hideAuthFormHandler}
            />
          </Modal.Header>
          <Modal.Content>
            <Menu attached="top" tabular size="massive" borderless widths={2}>
              <Menu.Item
                name="Sign In"
                active={this.state.formType === "signin"}
                onClick={() => this.tabSwitchHandler("signin")}
              />
              <Menu.Item
                position="right"
                name="Sign Up"
                active={this.state.formType === "signup"}
                onClick={() => this.tabSwitchHandler("signup")}
              />
            </Menu>
            <Segment attached="bottom"> {this.renderAuthForm()} </Segment>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[Auth.js] component did mount");
  }

  componentWillUnmount() {
    console.log("[Auth.js] component will unmount");
  }

  shouldComponentUpdate() {
    console.log("[Auth.js] should component Update");
    return true;
  }

  componentDidUpdate() {
    console.log("[Auth.js] component did update");
  }

  // Backend Calls
  open = () => {
    this.setState({ shouldOpen: true });
  };

  close = () => {
    this.setState({ shouldOpen: false, formType: "" });
  };

  getSignupData = () => {
    const data = {
      username: this.state.username,
      password1: this.state.password,
      password2: this.state.password,
      email: this.state.email
    };
    return data;
  };

  getSignInData = () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    return data;
  };

  handleAuthentication = event => {
    const isSignup = this.state.formType === "signup" ? true : false;

    if (isSignup) {
      signupHandler(event, this.getSignupData());
    } else {
      signinHandler(event, this.getSignInData());
    }
    this.close();
    this.props.reloadOnAuthEvent();
    Router.push(window.location.pathname);
  };
}

export default Auth;
