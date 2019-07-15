import React from "react";

import css from "./navbar.scss";
import { logoutHandler } from "../../../Requests/Authentication";
import UserPopup from "./userpopup";

const menus = ["Courses", "Contribute", "Blog"];

const renderAuthMenuItem = props => {
  if (!props.isAuthenticated) {
    return (
      <>
        <div>
          <button
            className={css.join}
            onClick={() => props.showAuthFormHandler("signup")}>
            Join
          </button>
        </div>
        <div>
          <button
            className={css.signIn}
            onClick={() => props.showAuthFormHandler("signin")}>
            Sign In
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <UserPopup
          user={props.user}
          handleSignout={event => handleSignout(event, props.signOutHandler)}>
          <button className={css.user}>
            <img src="../../../../static/assets/icon/person_outline_24px_outlined.svg" />
          </button>
        </UserPopup>
      </div>
    );
  }
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
        <a href={"/".concat(m.toLowerCase())}>
          <button className={css.navLink}>{m}</button>
        </a>
      </div>
    );
  });
};

const navbar = props => {
  return (
    <div className={css.navbar}>
      <div className={css.container}>
        <div className={css.brandLogo}>
          <a href="/">
            <button>Anshdata</button>
          </a>
        </div>
        <div className={css.item}>
          {renderNavMenus(props)}
          {renderAuthMenuItem(props)}
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

export default navbar;
