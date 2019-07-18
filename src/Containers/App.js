import React, { Component } from "react";
import dynamic from "next/dynamic";
import Ribbon from "../Components/Generic/Ribbon/ribbon";
import Navbar from "../Components/Generic/Navbar/Navbar";
import Footer from "../Components/Generic/Footer/Footer";
import Auth from "../Components/Generic/Auth/Auth";
import Feedback from "../Components/Generic/Feedback/feedback";
import { connect } from "react-redux";
import { makeUserVerify, getTopCourses } from "../store/actions";
const DynamicNotification = dynamic(
  () => import("../Components/Generic/Notifications/notification"),
  { ssr: false }
);
class App extends Component {
  state = {
    page: this.props.page,
    isAuthenticated: this.props.isAuthenticated,
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
    return (
      <div className={"App"}>
        <Ribbon
          text={
            "Welcome! and thank you for visiting Anshdata. The platform is currently in Alpha testing phase. We appreciate your support!"
          }
        />

        <Navbar
          showAuthFormHandler={this.showAuthFormHandler}
          activeMenu={this.state.page}
          shouldToggleFeedback={this.shouldToggleFeedback}
        />
        <DynamicNotification />

        {this.state.attemptingSignIn ? (
          <Auth
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
    console.log(
      "[App.js] component did mount State :",
      this.state,
      "Props : ",
      this.props
    );
    if (this.props.isAuthenticated) {
      this.props.makeUserVerify();
    }
    this.props.getTopCourses();
  }

  componentWillUnmount() {
    console.log("[App.js] component will unmount");
  }

  componentDidUpdate() {
    console.log("[App.js] component did update");
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

const mapDispatchToProps = { makeUserVerify, getTopCourses };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
