import React, { Component } from "react";
import Head from "next/head";

import Navbar from "../Components/Generic/Navbar/Navbar";
import Auth from "../Components/Generic/Auth/Auth";

class App extends Component {
  state = {
    page: this.props.page,
    isAuthenticated: false,
    AnshdataUser: null,
    attemptingSignIn: false
  };

  hideAuthFormHandler = () => {
    this.setState({ attemptingSignIn: false });
  };

  authEventHandler = () => {
    const rawUserData = localStorage.getItem("AnshdataUser");
    const isAuthenticated = !!rawUserData;
    const user = JSON.parse(rawUserData);
    this.setState({
      isAuthenticated: isAuthenticated,
      AnshdataUser: user
    });
  };

  signOutHandler = () => {
    localStorage.removeItem("AnshdataUser");
    this.setState({ isAuthenticated: false, attemptingSignIn: false });
    this.authEventHandler();
  };

  showAuthFormHandler = () => {
    this.setState({ attemptingSignIn: true });
  };

  render() {
    console.log(
      "[App.js] render\n-------------------------------------------"
    );
    return (
      <div className={"App"}>
        <Head>
          <title>Anshdata</title>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
        </Head>
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          showAuthFormHandler={this.showAuthFormHandler}
          user={this.state.AnshdataUser}
          activeMenu={this.state.page}
          signOutHandler={this.signOutHandler}
        />
        {this.state.attemptingSignIn ? (
          <Auth
            reloadOnAuthEvent={this.authEventHandler}
            hideAuthFormHandler={this.hideAuthFormHandler}
          />
        ) : null}
        <div>{this.props.children}</div>
      </div>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[App.js] component did mount", this.state);
    if (!this.state.isAuthenticated) {
      this.authEventHandler();
    }
  }

  componentWillUnmount() {
    console.log("[App.js] component will unmount");
  }

  shouldComponentUpdate() {
    console.log("[App.js] should component Update");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] component did update");
  }
}

export default App;
