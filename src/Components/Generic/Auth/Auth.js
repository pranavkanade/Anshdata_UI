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

const URLS = {
  USERSIGNUP: "http://127.0.0.1:8000/api/user/signup/",
  USERLOGIN: "http://127.0.0.1:8000/api/user/login/",
  GETUSER: "http://127.0.0.1:8000/api/user/me/"
};

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
            <Form
              onSubmit={event => {
                isSignup
                  ? this.signupHandler(event)
                  : this.signinHandler(event);
              }}
              size="large">
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
    const data = { ...this.state };
    return data;
  };

  getSignInData = () => {
    const data = { ...this.state };
    return data;
  };

  signupHandler = async event => {
    console.log("[Auth.js] Sign Up Handler", this.state);
    event.preventDefault();

    try {
      const signupData = this.getSignupData();
      console.log("[Auth.js] : Sign Up Data", signupData);
      const siginupRes = await fetch(URLS.USERSIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });
      const data = await siginupRes.json();
      console.log("signup data : ", data);
      localStorage.setItem("AnshdataUser", JSON.stringify(data));
    } catch (err) {
      console.log("[Auth.js] SIGNUP ERR : ", err);
      this.close();
      return;
    }

    try {
      const signinData = this.getSignInData();
      console.log("[Auth.js] Sign In Data", signinData);
      const loginRes = await fetch(URLS.USERLOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signinData)
      });
      let AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
      AnshdataUser["token"] = (await loginRes.json()).token;
      localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
    } catch (err) {
      console.log("[Auth.js] SIGNIN ERR : ", err);
    }
    this.close();
    this.props.reloadOnAuthEvent();
    const page = window.location.pathname;
    Router.push("/");
  };

  signinHandler = async event => {
    console.log("[Auth.js] Log In Handler", this.state);
    event.preventDefault();
    try {
      const signinData = this.getSignInData();
      console.log("[Auth] : Sign In Handler", signinData);
      const loginRes = await fetch(URLS.USERLOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signinData)
      });

      let AnshdataToken = (await loginRes.json()).token;
      const userRes = await fetch(URLS.GETUSER, {
        headers: {
          Authorization: `JWT ${AnshdataToken}`
        }
      });
      // NOTE: Here assume no error will occur
      // we get list so ..
      let AnshdataUser = (await userRes.json())[0];
      AnshdataUser["token"] = AnshdataToken;
      localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
    } catch (err) {
      console.log("[Auth.js] SIGNIN ERR : ", err);
    }
    this.close();
    this.props.reloadOnAuthEvent();
    const page = window.location.pathname;
    Router.push("/");
  };
}

export default Auth;
