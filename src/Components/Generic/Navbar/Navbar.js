import React from "react";
import Link from "next/link";
import css from "./navbar.scss";
import { logoutHandler } from "../../../Requests/Authentication";
import UserPopup from "./userpopup";
import { connect } from "react-redux";

const menus = ["Courses", "Contribute", "Blog"];

class Navbar extends React.Component {
  state = {
    isAuthenticated: false,
    user: null
  };

  handleSignout = async (event, handler) => {
    event.preventDefault();
    console.log("logging out of here");
    await logoutHandler(event);
    handler();
  };

  renderNavMenus = () => {
    return menus.map((m, i) => {
      return (
        <div key={i}>
          <Link href={"/".concat(m.toLowerCase())}>
            <button className={css.navLink}>{m}</button>
          </Link>
        </div>
      );
    });
  };

  renderUserPopup = () => {
    if (this.state.user === null) {
      return null;
    }
    return (
      <div className={css.user_outlook}>
        <UserPopup
          user={this.state.user}
          handleSignout={event =>
            this.handleSignout(event, this.props.signOutHandler)
          }>
          <button className={css.user}>
            <img src="../../../../static/assets/icon/person_outline_24px_outlined.svg" />
          </button>
        </UserPopup>
      </div>
    );
  };

  renderAuthBtns = () => {
    const { showAuthFormHandler } = this.props;
    return (
      <React.Fragment>
        <div>
          <button
            className={css.join}
            onClick={() => showAuthFormHandler("signup")}>
            Join
          </button>
        </div>
        <div>
          <button
            className={css.signIn}
            onClick={() => showAuthFormHandler("signin")}>
            Sign In
          </button>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div className={css.navbar}>
        <div className={css.container}>
          <div className={css.brandLogo}>
            <Link href="/">
              <button>Anshdata</button>
            </Link>
          </div>
          <div className={css.item}>
            {this.renderNavMenus()}
            {isAuthenticated ? this.renderUserPopup() : this.renderAuthBtns()}
            {!isAuthenticated ? (
              <button
                className={css.float_join}
                onClick={() => this.props.showAuthFormHandler("signup")}>
                Join
              </button>
            ) : null}
            <button
              className={css.feedback}
              onClick={this.props.shouldToggleFeedback}>
              feedback 🤓
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    if (this.state.user === null) {
      this.setState({
        user: this.props.user,
        isAuthenticated: this.props.isAuthenticated
      });
    }
  };

  componentDidUpdate = () => {
    if (this.state.user === null && this.props.user !== null) {
      this.setState({
        user: this.props.user,
        isAuthenticated: this.props.isAuthenticated
      });
    }
  };
}

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.user;
  return { isAuthenticated, user };
}

export default connect(mapStateToProps)(Navbar);
