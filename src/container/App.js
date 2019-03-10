import React, { Component } from "react";
import Head from "next/head";
import Router from "next/router";

import Navbar from "../Components/Navbar/Navbar";
import AuthForm from "../Components/AuthForm/Auth";

class App extends Component {
  state = {
    navEventKey: "home",
    preNavEventKey: "home"
  };

  // handleNavbarTransition
  navHandler = eventKey => {
    const preNav = this.state.navEventKey;
    this.setState({ navEventKey: eventKey, preNavEventKey: preNav });
  };

  resetNav = eventKey => {
    const preNav = this.state.preNavEventKey;
    this.setState({ navEventKey: preNav, preNavEventKey: eventKey });
  };

  renderNavEvent = () => {
    switch (this.state.navEventKey) {
      case "signin":
        this.renderAuthForm();
        break;
      default:
        return null;
    }
  };

  logoutHandler = event => {
    localStorage.removeItem("AnshdataUser");
    this.navHandler("home");
    Router.push("/");
  };

  renderAuthForm = () => {
    if (this.state.navEventKey === "signin") {
      return (
        <AuthForm formType={this.state.navEventKey} resetNav={this.resetNav} />
      );
    }
    return null;
  };

  getUser = () => {
    return JSON.parse(localStorage.getItem("AnshdataUser"));
  };

  componentDidMount = () => {
    const AnshdataUser = this.getUser();
    console.log("[App.js] Trying to log AnshdataUser");
    console.log(AnshdataUser);
    const isAuthenticated = !!localStorage.getItem("AnshdataUser");
    const user = JSON.parse(localStorage.getItem("AnshdataUser"));
    this.setState({
      isAuthenticated: isAuthenticated,
      AnshdataUser: user
    });
  };

  render() {
    return (
      <div className="App">
        <Head>
          <title>Anshdata</title>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <Navbar
          navHandler={this.navHandler}
          logoutHandler={this.logoutHandler}
          activeItem={this.state.navEventKey}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.AnshdataUser}
        />
        {this.renderAuthForm()}
        {this.props.children}
      </div>
    );
  }
}

export default App;
