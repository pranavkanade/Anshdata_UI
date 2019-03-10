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
import StyleClasses from "./Navbar.css";

const renderAuthMenuItem = (props, activeItem) => {
  if (!props.isAuthenticated) {
    return (
      <Menu.Item>
        <Button
          color="violet"
          content="Sign In"
          active={activeItem === "signin"}
          onClick={() => props.navHandler("signin")}
          inverted
        />
      </Menu.Item>
    );
  } else {
    return (
      <Menu.Item className={StyleClasses.UserMenuItem}>
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
          <Image
            src="/static/images/avatar/female_1.png"
            size="small"
            centered
          />
          <Card>
            <Card.Content>
              <Card.Header>{props.user.username}</Card.Header>
              <Card.Meta>
                <span className="email">{props.user.email}</span>
              </Card.Meta>
              {props.user.is_producer ? (
                <Card.Description>
                  Keep creating more content!!
                </Card.Description>
              ) : null}
            </Card.Content>
            <Card.Content extra>
              <Link href="/">
                <Button basic onClick={props.logoutHandler}>
                  Sign Out
                </Button>
              </Link>
              <Button basic>Setting</Button>
            </Card.Content>
          </Card>
        </Popup>
      </Menu.Item>
    );
  }
};

const navBar = props => {
  const activeItem = props.activeItem;
  return (
    <Menu secondary size="massive" attached pointing>
      <Container fluid>
        <Link href="/">
          <Menu.Item as="div" header>
            <a>Anshdata</a>
          </Menu.Item>
        </Link>
        <Menu.Menu className={StyleClasses.Menu} position="right">
          <Menu.Item
            as="div"
            name="Explore"
            active={activeItem === "explore"}
            onClick={() => props.navHandler("explore")}>
            <a>Explore</a>
          </Menu.Item>
          <Menu.Item
            as="div"
            name="Blog"
            active={activeItem === "blog"}
            onClick={() => props.navHandler("blog")}>
            <a>Blog</a>
          </Menu.Item>
          <Menu.Item
            as="div"
            name="Forum"
            active={activeItem === "forum"}
            onClick={() => props.navHandler("forum")}>
            <a>Forum</a>
          </Menu.Item>
          {renderAuthMenuItem(props, activeItem)}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default navBar;
