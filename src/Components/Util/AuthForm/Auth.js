import React, { Component } from "react";

import {
  Form,
  Modal,
  Menu,
  Segment,
  Grid,
  Header,
  Divider,
  Image
} from "semantic-ui-react";

import StyleClasses from "./Auth.scss";

const URLS = {
  USERSIGNUP: "http://127.0.0.1:8000/api/user/signup/",
  USERLOGIN: "http://127.0.0.1:8000/api/user/login/",
  GETUSER: "http://127.0.0.1:8000/api/user/me/"
};

class AuthForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    isProducer: false,
    shouldOpen: true,
    formType: "signin"
  };

  getLoginData = () => {
    return {
      username: this.state.username,
      password: this.state.password
    };
  };

  getSignupData = () => {
    let data = { ...this.state };
    data["isProducer"] = this.state.isProducer === "on" ? true : false;
    return data;
  };

  setFormType = formType => {
    this.setState(prevState => {
      const pState = { ...prevState };
      pState.formType = formType;
      return pState;
    });
  };

  checkboxChangeHandler = () => {
    const isProducer = this.state.isProducer;
    this.setState({ isProducer: !isProducer });
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

  open = () => {
    this.setState({ shouldOpen: true });
  };

  close = () => {
    this.setState({ shouldOpen: false, formType: "" });
  };

  componentDidMount = () => {
    // TODO: do some thing here but this is not needed
    // this.setState({ formType: this.props.formType });
  };

  componentWillUnmount = () => {
    this.props.hideAuthFormHandler();
  };

  handleItemClick = tabKey => {
    this.setState({ formType: tabKey });
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
    const authForm = (
      <Form
        className={StyleClasses.Auth}
        onSubmit={event => {
          isSignup ? this.signupHandler(event) : this.loginHandler(event);
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
      </Form>
    );

    // TODO: Break down this function in small pieces

    const addGrid = form => {
      if (this.state.formType === "signin") {
        return (
          <Grid stackable>
            <Grid.Row columns={1}>
              <Grid.Column>{form}</Grid.Column>
            </Grid.Row>
            <Divider horizontal>Or</Divider>
            <Grid.Row textAlign="center" verticalAlign="middle" columns={1}>
              <Grid.Column>
                <Header>Continue with ...</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={4} verticalAlign="middle" textAlign="center">
              {/* TODO: Add auth mechanism for all of the following
                Also convert it into list of items and them map the output
            */}
              <Grid.Column>
                <Image
                  src="/static/images/signin_logo/facebook.svg"
                  size="mini"
                  centered
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="/static/images/signin_logo/github.svg"
                  size="mini"
                  centered
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="/static/images/signin_logo/search.svg"
                  size="mini"
                  centered
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="/static/images/signin_logo/twitter.svg"
                  size="mini"
                  centered
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
      }

      return form;
    };

    return addGrid(authForm);
  };

  signupHandler = async event => {
    event.preventDefault();
    const signupData = this.getSignupData();
    console.log("[Auth] : Signup Handler");
    console.log(signupData);
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
    const loginData = this.getLoginData();

    const loginRes = await fetch(URLS.USERLOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });
    let AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
    AnshdataUser["token"] = (await loginRes.json()).token;
    localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
    this.close();
    this.props.reloadOnAuthEvent();
  };

  loginHandler = async event => {
    event.preventDefault();
    const loginData = this.getLoginData();
    console.log("[Auth] : Login Handler");
    console.log(loginData);
    const loginRes = await fetch(URLS.USERLOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
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

  render() {
    return (
      <div>
        <Modal
          className={StyleClasses.authModal}
          size="tiny"
          dimmer="blurring"
          open={this.state.shouldOpen}
          onClose={this.close}
          centered>
          <Modal.Header className={StyleClasses.modalHeader}>
            {this.state.formType === "signin"
              ? "Sign in to your account"
              : "Create your new account"}
          </Modal.Header>
          <Modal.Content>
            <Menu attached="top" tabular size="massive" borderless widths={2}>
              <Menu.Item
                name="Sign In"
                active={this.state.formType === "signin"}
                onClick={() => this.handleItemClick("signin")}
              />
              <Menu.Item
                position="right"
                name="Sign Up"
                active={this.state.formType === "signup"}
                onClick={() => this.handleItemClick("signup")}
              />
            </Menu>
            <Segment attached="bottom"> {this.renderAuthForm()} </Segment>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AuthForm;
