import React, { Component } from "react";
import Head from "next/head";
import Router from "next/router";

import Navbar from "../Components/Util/Navbar/Navbar";
import AuthForm from "../Components/Util/AuthForm/Auth";

class App extends Component {
  state = {
    navEventKey: "Home",
    attemptingSignIn: false,
    isAuthenticated: false,
    AnshdataUser: null
  };

  setUserData = () => {
    const rawUserData = localStorage.getItem("AnshdataUser");
    const isAuthenticated = !!rawUserData;
    const user = JSON.parse(rawUserData);
    this.setState({
      isAuthenticated: isAuthenticated,
      AnshdataUser: user
    });
  };

  reloadOnAuthEvent = () => {
    this.setUserData();
  };

  // handleNavbarTransition
  navHandler = eventKey => {
    const preNav = this.state.navEventKey;
    this.setState({ navEventKey: eventKey });
  };

  showAuthFormHandler = () => {
    this.setState({ attemptingSignIn: true });
    // will be unset automatically on rerender
  };

  hideAuthFormHandler = () => {
    this.setState({ attemptingSignIn: false });
  };

  logoutHandler = event => {
    localStorage.removeItem("AnshdataUser");
    this.hideAuthFormHandler();
    this.reloadOnAuthEvent();
  };

  componentDidMount = () => {
    console.log("[App.js] Component Did Mount");
    console.log(this.state);
    // If we already have the authenticated user's info loaded in state
    // No need to fetch again from localStorage
    if (!this.state.isAuthenticated) {
      this.setUserData();
    }
    this.setState({
      navEventKey: this.props.page
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
          showAuthFormHandler={this.showAuthFormHandler}
          logoutHandler={this.logoutHandler}
          activeItem={this.state.navEventKey}
          isAuthenticated={this.state.isAuthenticated}
          user={this.state.AnshdataUser}
        />
        {this.state.attemptingSignIn ? (
          <AuthForm
            reloadOnAuthEvent={this.reloadOnAuthEvent}
            hideAuthFormHandler={this.hideAuthFormHandler}
          />
        ) : null}
        {this.props.children}
      </div>
    );
  }
}

export default App;
