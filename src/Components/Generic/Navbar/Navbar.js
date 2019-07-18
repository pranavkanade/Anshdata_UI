import React from "react";
import Link from "next/link";
import css from "./navbar.scss";
import { logoutHandler } from "../../../Requests/Authentication";
import UserPopup from "./userpopup";
import { connect } from "react-redux";
import Router from "next/router";
import { storeUserSignedOut } from "../../../store/actions";

const menus = ["Courses", "Contribute", "Blog"];

const handleSignout = async (event, props) => {
  event.preventDefault();
  console.log("logging out of here");
  // this.setState({ isAuthenticated: false, user: null });
  props.storeUserSignedOut();
  await logoutHandler(event);
  Router.push("/");
};

const renderNavMenus = () => {
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

const renderUserPopup = props => {
  const { user } = props;
  if (user === null) {
    return null;
  }
  return (
    <div className={css.user_outlook}>
      <UserPopup user={user} handleSignout={e => handleSignout(e, props)}>
        <div className={css.user}>
          <img src="../../../../static/assets/icon/person_outline_24px_outlined.svg" />
        </div>
      </UserPopup>
    </div>
  );
};

const renderAuthBtns = ({ showAuthFormHandler }) => {
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

const navbar = props => {
  const { isAuthenticated } = props;
  return (
    <div className={css.navbar}>
      <div className={css.container}>
        <div className={css.brandLogo}>
          <Link href="/">
            <button>Anshdata</button>
          </Link>
        </div>
        <div className={css.item}>
          {renderNavMenus()}
          {isAuthenticated ? renderUserPopup(props) : renderAuthBtns(props)}
        </div>
        <div>
          {!isAuthenticated ? (
            <a
              className={css.float_join}
              onClick={() => props.showAuthFormHandler("signup")}>
              Join
            </a>
          ) : null}
          <button
            className={css.feedback}
            onClick={props.shouldToggleFeedback}>
            feedback 🤓
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.user;
  return { isAuthenticated, user };
}

const mapDispatchToProps = { storeUserSignedOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navbar);
