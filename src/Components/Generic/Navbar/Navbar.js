import React from "react";
import Link from "next/link";

import { Menu, Container, Button, MenuItem } from "semantic-ui-react";
import css from "./navbar.scss";

const menus = ["Courses", "Contribute"];

const renderAuthMenuItem = props => {
  if (!props.isAuthenticated) {
    return (
      <>
        <a
          className={css.join}
          onClick={() => props.showAuthFormHandler("signup")}>
          <Menu.Item>
            <text>Join</text>
          </Menu.Item>
        </a>
        <a
          className={css.signIn}
          onClick={() => props.showAuthFormHandler("signin")}>
          <Menu.Item>
            <text>Sign In</text>
          </Menu.Item>
        </a>
      </>
    );
  } else {
    return (
      <>
        <a href={`/u/${props.user.username}`}>
          <Menu.Item>
            <text className={css.navLink}>{props.user.username}</text>
          </Menu.Item>
        </a>
        <Menu.Item>
          <Button
            color="red"
            content="Sign Out"
            onClick={props.signOutHandler}
          />
        </Menu.Item>
      </>
    );
  }
};

const renderNavMenus = props => {
  return menus.map((m, i) => {
    return (
      <a href={"/".concat(m.toLowerCase())} key={i}>
        <Menu.Item as="div" name={m} active={props.activeMenu === m}>
          <text className={css.navLink}>{m}</text>
        </Menu.Item>
      </a>
    );
  });
};

const navbar = props => {
  return (
    <div className={"Navbar"}>
      <Menu secondary stackable borderless fixed="top">
        <Container>
          <a className={css.brandLogo} href="/">
            <text>Anshdata</text>
          </a>
          <Menu.Menu position="right">
            {renderNavMenus(props)}
            {renderAuthMenuItem(props)}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
};

export default navbar;
