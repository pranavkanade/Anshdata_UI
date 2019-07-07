import React, { Component } from "react";

import { Dialog } from "evergreen-ui";
import {
  Nav,
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl
} from "rsuite";
import Router from "next/router";

import Loader from "../../Generic/Loader/loader";

import {
  signinHandler,
  signupHandler
} from "./../../../Requests/Authentication";

import css from "./auth.scss";

class Auth extends Component {
  state = {
    formValue: {
      username: "",
      email: "",
      password: ""
    },
    shouldOpen: true,
    formType: this.props.authOption,
    isLoading: false
  };

  handleChange = value => {
    console.log("handle change : ", value);
    this.setState({
      formValue: value
    });
  };

  tabSwitchHandler = tabKey => {
    this.setState({ formType: tabKey });
  };

  renderEmailField = isSignup => {
    if (isSignup) {
      return (
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            name="email"
            type="email"
            className={css.ad_auth_form_input}
          />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
      );
    } else {
      return null;
    }
  };

  renderAuthForm = () => {
    const isSignup = this.state.formType === "signup" ? true : false;

    return (
      <Form
        fluid
        onChange={this.handleChange}
        formValue={this.state.formValue}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl name="username" className={css.ad_auth_form_input} />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        {this.renderEmailField(isSignup)}
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            className={css.ad_auth_form_input}
          />
        </FormGroup>

        <button
          className={
            css.ad_authBtn +
            " " +
            (isSignup ? css.ad_signupBtn : css.ad_signinBtn)
          }
          onClick={this.handleAuthentication}>
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </Form>
    );
  };

  render() {
    console.log(
      "[Auth.js] render\n-------------------------------------------"
    );

    if (this.state.isLoading) {
      return <Loader msg="Working on User Authentication" />;
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
        hasFooter={false}
        padding={16}>
        <div>
          <Nav
            appearance="subtle"
            activeKey={this.state.formType}
            onSelect={this.tabSwitchHandler}
            justified>
            <Nav.Item eventKey="signin" className={css.ad_nav_tab_title}>
              <span>Sign In</span>
            </Nav.Item>
            <Nav.Item eventKey="signup" className={css.ad_nav_tab_title}>
              <span>Sign Up</span>
            </Nav.Item>
          </Nav>
          <div className={css.ad_auth_form_pane}>{this.renderAuthForm()}</div>
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
      username: this.state.formValue.username,
      password1: this.state.formValue.password,
      password2: this.state.formValue.password,
      email: this.state.formValue.email
    };
    return data;
  };

  getSignInData = () => {
    const data = {
      username: this.state.formValue.username,
      password: this.state.formValue.password
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
