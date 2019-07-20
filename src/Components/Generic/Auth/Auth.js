import React, { Component } from "react";

import { Dialog } from "evergreen-ui";
import {
  Nav,
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl,
  Schema,
  ButtonToolbar,
  Button
} from "rsuite";
import Router from "next/router";

import { connect } from "react-redux";
import { requestUserSignIn, storeUserSignedUp } from "../../../store/actions";

import Loader from "../../Generic/Loader/loader";

import {
  signinHandler,
  signupHandler
} from "./../../../Requests/Authentication";

import css from "./auth.scss";

const { StringType } = Schema.Types;

class Auth extends Component {
  state = {
    formValue: {
      username: "",
      email: "",
      password: ""
    },
    formError: {},
    shouldOpen: true,
    formType: this.props.authOption,
    isLoading: false
  };

  signupModel = Schema.Model({
    username: StringType().isRequired("This field is required."),
    email: StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required."),
    password: StringType().isRequired("This field is required.")
  });

  signinModel = Schema.Model({
    username: StringType().isRequired("This field is required."),
    password: StringType().isRequired("This field is required.")
  });

  handleChange = value => {
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
        ref={ref => (this.form = ref)}
        model={isSignup ? this.signupModel : this.signinModel}
        onCheck={formError => {
          this.setState({ formError });
        }}
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
        <ButtonToolbar>
          <Button
            className={
              css.ad_authBtn +
              " " +
              (isSignup ? css.ad_signupBtn : css.ad_signinBtn)
            }
            onClick={this.handleAuthentication}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </ButtonToolbar>
      </Form>
    );
  };

  render() {
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
        padding={16}
        style={{ position: "relative", zIndex: "1024" }}>
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
    if (!this.form.check()) {
      return;
    }
    this.setState({ isLoading: true });
    const isSignup = this.state.formType === "signup" ? true : false;

    if (isSignup) {
      const user = await signupHandler(this.getSignupData());
      this.props.storeUserSignedUp(user);
    } else {
      const resp = await signinHandler(this.getSignInData());
      this.props.requestUserSignIn(resp);
    }
    this.close();
    // TODO: This should not be here
    // Router.replace(window.location.pathname);
  };
}

function mapStateToProps(state) {
  const { user } = state.user;
  return { user };
}

const mapDispatchToProps = {
  requestUserSignIn,
  storeUserSignedUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
