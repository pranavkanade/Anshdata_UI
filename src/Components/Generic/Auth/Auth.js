import React, { Component } from "react";

import { Form, Menu, Grid, Divider, Modal, Loader } from "semantic-ui-react";
import { Dialog, Pane } from "evergreen-ui";
import Router from "next/router";

import {
  signinHandler,
  signupHandler
} from "./../../../Requests/Authentication";

import css from "./auth.scss";

class Auth extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    shouldOpen: true,
    formType: this.props.authOption,
    isLoading: false
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
          <label className={css.label}>Email</label>
          <input
            type="email"
            placeholder="pskanade@gmail.com"
            name="email"
            value={this.state.email}
            className={css.inp}
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
                <label className={css.label}>User Name</label>
                <input
                  placeholder="pskanade"
                  name="username"
                  type="text"
                  value={this.state.username}
                  className={css.inp}
                  onChange={event => this.changeHandler(event)}
                />
              </Form.Field>
              {this.renderEmailField(isSignup)}
              <Form.Field>
                <label className={css.label}>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  className={css.inp}
                  onChange={event => this.changeHandler(event)}
                />
              </Form.Field>
              <Divider hidden />
              <button
                className={
                  css.authBtn +
                  " " +
                  (isSignup ? css.signupBtn : css.signinBtn)
                }>
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
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

    if (this.state.isLoading) {
      return (
        <Modal open={true} basic dimmer="inverted">
          <Loader size="massive">Loading ...</Loader>
        </Modal>
      );
    }

    return (
      <Dialog
        preventBodyScrolling
        isShown={this.state.shouldOpen}
        title={
          this.state.formType === "signin"
            ? "Sign in to your account"
            : "Create your new account"
        }
        onCloseComplete={this.close}
        hasFooter={false}>
        <div>
          <Menu secondary pointing size="massive" borderless widths={2}>
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
          <Pane padding={32}>{this.renderAuthForm()}</Pane>
        </div>
      </Dialog>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[Auth.js] component did mount");
  }

  componentWillUnmount() {
    console.log("[Auth.js] component will unmount");
  }

  componentDidUpdate() {
    console.log("[Auth.js] component did update");
  }

  // Backend Calls
  open = () => {
    this.setState({ shouldOpen: true });
  };

  close = () => {
    this.setState({ shouldOpen: false, formType: "", isLoading: false });
    this.props.hideAuthFormHandler();
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

  handleAuthentication = async event => {
    this.setState({ isLoading: true });
    const isSignup = this.state.formType === "signup" ? true : false;

    if (isSignup) {
      await signupHandler(event, this.getSignupData());
    } else {
      await signinHandler(event, this.getSignInData());
    }
    this.close();
    this.props.reloadOnAuthEvent();
    Router.push(window.location.pathname);
  };
}

export default Auth;
