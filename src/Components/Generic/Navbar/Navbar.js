import React from "react";
import Link from "next/link";
import css from "./navbar.scss";
import { logoutHandler } from "../../../Requests/Authentication";
import UserPopup from "./userpopup";
import { connect } from "react-redux";

const menus = ["Courses", "Contribute", "Blog"];

const renderAuthBtns = showAuthFormHandler => {
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

const renderUserPopup = (user, signOutHandler) => {
  return (
    <div className={css.user_outlook}>
      <UserPopup
        user={user}
        handleSignout={event => handleSignout(event, signOutHandler)}>
        <button className={css.user}>
          <img src="../../../../static/assets/icon/person_outline_24px_outlined.svg" />
        </button>
      </UserPopup>
    </div>
  );
};

const handleSignout = async (event, handler) => {
  event.preventDefault();
  console.log("logging out of here");
  await logoutHandler(event);
  handler();
};

const renderNavMenus = props => {
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

const navbar = props => {
  const { isAuthenticated, user, signOutHandler, showAuthFormHandler } = props;
  return (
    <div className={css.navbar}>
      <div className={css.container}>
        <div className={css.brandLogo}>
          <Link href="/">
            <button>Anshdata</button>
          </Link>
        </div>
        <div className={css.item}>
          {renderNavMenus(props)}
          {isAuthenticated
            ? renderUserPopup(user, signOutHandler)
            : renderAuthBtns(showAuthFormHandler)}
          {!isAuthenticated ? (
            <button
              className={css.float_join}
              onClick={() => showAuthFormHandler("signup")}>
              Join
            </button>
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
  const { isAuthenticated, user } = state;
  return { isAuthenticated, user };
}

export default connect(mapStateToProps)(navbar);
