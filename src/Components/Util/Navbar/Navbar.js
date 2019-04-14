import React, { useState } from "react";
import Link from "next/link";

// import { Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import {
  Button,
  Menu,
  Container,
  Popup,
  Card,
  Image
} from "semantic-ui-react";
import StyleClasses from "./Navbar.scss";

const renderUserInfoPopup = props => {
  return (
    <Popup
      className={StyleClasses.UserInfoPopup}
      basic
      trigger={
        <Image
          src="/static/images/avatar/female_1.png"
          size="mini"
          style={{ maxWidth: "85%" }} // TODO: Avoid doing this (make it centred)
        />
      }
      on="click"
      position="bottom right">
      <Image src="/static/images/avatar/female_1.png" size="small" centered />
      <Card>
        <Card.Content>
          <Card.Header>{props.user.username}</Card.Header>
          <Card.Meta>
            <span className="email">{props.user.email}</span>
          </Card.Meta>
          {props.user.is_producer ? (
            <Card.Description>Keep creating more content!!</Card.Description>
          ) : null}
        </Card.Content>
        <Card.Content extra>
          {/* NOTE: if u want 2 sty on page whr u r b4 logout remove below
              link */}
          <Link href="/">
            <Button basic onClick={props.logoutHandler}>
              Sign Out
            </Button>
          </Link>
          <Button basic>Setting</Button>
        </Card.Content>
      </Card>
    </Popup>
  );
};

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
      <Menu.Item className={StyleClasses.UserMenuItem}>
        {renderUserInfoPopup(props)}
      </Menu.Item>
    );
  }
};

const menus = ["Profile", "Dashboard", "Explore", "Blog", "Forum"];

const renderNavMenus = props => {
  return menus.map((m, i) => {
    return (
      <Link href={"/".concat(m)} key={i}>
        <Menu.Item
          className={StyleClasses.item}
          as="div"
          name={m}
          active={props.activeItem === m}
          onClick={() => props.navHandler(m)}>
          <a>{m}</a>
        </Menu.Item>
      </Link>
    );
  });
};

const navBar = props => {
  return (
    <div className={StyleClasses.navbar}>
      <Menu as="div" fixed="top" stackable secondary borderless>
        <Container fluid>
          <Link href="/">
            <Menu.Item className={StyleClasses.MenuHead} as="div" header>
              <a onClick={() => props.navHandler("Home")}>Anshdata</a>
            </Menu.Item>
          </Link>
          <Menu.Menu className={StyleClasses.Menu} position="right">
            {renderNavMenus(props)}
            {renderAuthMenuItem(props)}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
};

export default navBar;
