import React from "react";
import Link from "next/link";

// import { Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import { Button, Menu, Container } from "semantic-ui-react";
import StyleClasses from "./Navbar.css";

const navBar = props => {
  const activeItem = props.activeItem;
  return (
    <Menu secondary size="huge" attached pointing>
      <Container fluid>
        <Menu.Item header>Anshdata</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="Explore"
            active={activeItem === "explore"}
            onClick={() => props.navHandler("explore")}
          />
          <Menu.Item
            name="Blog"
            active={activeItem === "blog"}
            onClick={() => props.navHandler("blog")}
          />
          <Menu.Item
            name="Forum"
            active={activeItem === "forum"}
            onClick={() => props.navHandler("forum")}
          />
          <Menu.Item>
            <Button
              color="violet"
              content="Sign In"
              active={activeItem === "signin"}
              onClick={() => props.navHandler("signin")}
              inverted
            />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default navBar;
