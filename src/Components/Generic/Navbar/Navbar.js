import React from "react";

import css from "./navbar.scss";
import { logoutHandler } from "../../../Requests/Authentication";

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
            <text>Sign In</text>
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <a href={`/u/${props.user.username}`}>
            <button className={css.navLink}>{props.user.username}</button>
          </a>
        </div>
        <div>
          <button
            className={css.signOut}
            onClick={event => handleSignout(event, props.signOutHandler)}>
            <text>Sign Out</text>
          </button>
        </div>
      </>
    );
  }
};

const handleSignout = async (event, handler) => {
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
        </div>
      </div>
    </div>
  );
};

export default navbar;
