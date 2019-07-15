import React, { Component } from "react";

import Ribbon from "../Components/Generic/Ribbon/ribbon";
import Navbar from "../Components/Generic/Navbar/Navbar";
import Footer from "../Components/Generic/Footer/Footer";
import Auth from "../Components/Generic/Auth/Auth";
import Feedback from "../Components/Generic/Feedback/feedback";
import Router from "next/router";
import { getADUser } from "../Requests/Authorization";
import { verifyUserToken } from "../Requests/Authentication";

class App extends Component {
  state = {
    page: this.props.page,
    isAuthenticated: false,
    AnshdataUser: null,
    attemptingSignIn: false,
    authOption: "signup",
    showFeedback: false
  };

  shouldToggleFeedback = () => {
    this.setState({ showFeedback: !this.state.showFeedback });
  };

  hideAuthFormHandler = () => {
    this.setState({ attemptingSignIn: false });
  };

  authEventHandler = () => {
    // const rawUserData = localStorage.getItem("AnshdataUser");
    const adUser = getADUser();
    console.log("[App.js] auth Event handler", adUser);
    let isAuthenticated = adUser === null ? false : !!adUser.token;
    let user;
    try {
      user = adUser.user;
    } catch (err) {
      user = null;
      isAuthenticated = false;
    }
    this.setState({
      isAuthenticated: isAuthenticated,
      AnshdataUser: user
    });
  };

  signOutHandler = () => {
    this.setState({ isAuthenticated: false, attemptingSignIn: false });
    this.authEventHandler();
    Router.replace("/");
  };

  showAuthFormHandler = authOption => {
    this.setState({ attemptingSignIn: true, authOption });
  };

  renderChildren = () => {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        showAuthFormHandler: this.showAuthFormHandler
      });
    });

    return <>{children}</>;
  };

  render() {
    console.log(
      "[App.js] render\n-------------------------------------------"
    );
    return (
      <div className={"App"}>
        <Ribbon
          text={
            "Welcome! and thank you for visiting Anshdata. The platform is currently in Alpha testing phase. We appreciate your support!"
          }
        />
        <Navbar
          isAuthenticated={this.state.isAuthenticated}
          showAuthFormHandler={this.showAuthFormHandler}
          user={this.state.AnshdataUser}
          activeMenu={this.state.page}
          signOutHandler={this.signOutHandler}
          shouldToggleFeedback={this.shouldToggleFeedback}
        />
        {this.state.attemptingSignIn ? (
          <Auth
            reloadOnAuthEvent={this.authEventHandler}
            hideAuthFormHandler={this.hideAuthFormHandler}
            authOption={this.state.authOption}
          />
        ) : null}
        {this.state.showFeedback ? (
          <Feedback shouldToggleFeedback={this.shouldToggleFeedback} />
        ) : null}
        <div>{this.renderChildren()}</div>
        <Ribbon
          text={
            "Welcome! and thank you for visiting Anshdata. The platform is currently in Alpha testing phase. We appreciate your support!"
          }
        />
        <Footer />
      </div>
    );
  }

  // Lifecycle methods
  componentDidMount() {
    console.log("[App.js] component did mount", this.state);
    verifyUserToken();
    if (!this.state.isAuthenticated) {
      this.authEventHandler();
    }
  }

  componentWillUnmount() {
    console.log("[App.js] component will unmount");
  }

  componentDidUpdate() {
    console.log("[App.js] component did update");
  }
}

export default App;
