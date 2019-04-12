import React, { Component } from "react";

import { Form, Modal, Menu, Segment, Grid, Header } from "semantic-ui-react";

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
    isProducer: false,
    shouldOpen: true,
    formType: "signin"
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

  checkboxChangeHandler = () => {
    const isProducer = this.state.isProducer;
    this.setState({ isProducer: !isProducer });
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

  renderCheckboxField = isSignup => {
    if (isSignup) {
      return (
        <Form.Checkbox
          label="Create Producer's account"
          name="isProducer"
          checked={this.state.isProducer}
          onClick={this.checkboxChangeHandler}
        />
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
              {this.renderCheckboxField(isSignup)}

              <Form.Button type="submit" size="large" color="violet" inverted>
                {isSignup ? "Sign Up" : "Sign In"}
              </Form.Button>

              <Form.Button
                size="large"
                color="red"
                onClick={this.props.hideAuthFormHandler}>
                Cancle
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
      <>
        <Modal
          size="tiny"
          dimmer="blurring"
          open={this.state.shouldOpen}
          onClose={this.close}
          centered>
          <Modal.Header>
            {this.state.formType === "signin"
              ? "Sign in to your account"
              : "Create your new account"}
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
      </>
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
    let data = { ...this.state };
    data["isProducer"] = this.state.isProducer === "on" ? true : false;
    return data;
  };

  getSignInData = () => {
    return {
      username: this.state.username,
      password: this.state.password
    };
  };

  signupHandler = async event => {
    console.log("[Auth.js] Sign Up Handler", this.state);
    event.preventDefault();
    const signupData = this.getSignupData();
    console.log("[Auth.js] : Sign Up Data", signupData);
    const siginupRes = await fetch(URLS.USERSIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupData)
    });
    //This means that one has signed up;
    localStorage.setItem(
      "AnshdataUser",
      JSON.stringify((await siginupRes.json())["user"])
    );
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
    this.close();
    this.props.reloadOnAuthEvent();
  };

  signinHandler = async event => {
    console.log("[Auth.js] Log In Handler", this.state);
    event.preventDefault();
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
    this.close();
    this.props.reloadOnAuthEvent();
  };
}

export default Auth;
