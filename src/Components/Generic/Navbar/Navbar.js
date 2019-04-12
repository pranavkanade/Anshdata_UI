import React from "react";
import Link from "next/link";

import { Menu, Container, Button } from "semantic-ui-react";

const menus = ["Courses"];

const renderAuthMenuItem = props => {
  if (!props.isAuthenticated) {
    return (
      <Menu.Item>
        <Button
          color="blue"
          content="Sign In"
          onClick={props.showAuthFormHandler}
        />
      </Menu.Item>
    );
  } else {
    return (
      <>
        <Menu.Item>{props.user.username}</Menu.Item>
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
      <Link href={"/".concat(m.toLowerCase())} key={i}>
        <Menu.Item as="div" name={m} active={props.activeMenu === m}>
          <a>{m}</a>
        </Menu.Item>
      </Link>
    );
  });
};

const navbar = props => {
  return (
    <div className={"Navbar"}>
      <Menu as="div" secondary stackable borderless>
        <Container>
          <Link href="/">
            <Menu.Item as="div" header>
              Anshdata
            </Menu.Item>
          </Link>
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
