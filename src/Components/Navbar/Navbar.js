import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import StyleClasses from "./Navbar.modules.css";

const navbar = props => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Row>
                    <Col>
                        <Navbar.Brand href="#home">AnshData</Navbar.Brand>
                    </Col>
                    <Col className={StyleClasses.Options}>
                        <Nav className="mr-auto">
                            <Nav.Link
                                href="#home"
                                onSelect={ek => props.navHandler(ek)}
                                eventKey="home">
                                Home
                            </Nav.Link>
                            <Nav.Link
                                href="#catalog"
                                onSelect={ek => props.navHandler(ek)}
                                eventKey="courses">
                                Courses
                            </Nav.Link>
                            <Nav.Link
                                href="#signup"
                                onSelect={ek => props.navHandler(ek)}
                                eventKey="signup">
                                SignUp
                            </Nav.Link>
                            <Nav.Link
                                href="#signin"
                                onSelect={ek => props.navHandler(ek)}
                                eventKey="signin">
                                SignIn
                            </Nav.Link>
                            <Nav.Link
                                href="#logout"
                                onSelect={ek => props.logoutHandler(ek)}
                                eventKey="logout">
                                SignOut
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default navbar;

// <Form inline>
// <FormControl
//     type="text"
//     placeholder="Search"
//     className="mr-sm-2"
// />
// <Button variant="outline-info">Search</Button>
// </Form>
