import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import "./Auth.modules.css";

class AuthForm extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        isProducer: false
    };

    getLoginData = () => {
        return {
            username: this.state.username,
            password: this.state.password
        };
    };

    getSignupData = () => {
        let data = { ...this.state };
        data["isProducer"] = this.state.isProducer === "on" ? true : false;
        return data;
    };

    setFormType = formType => {
        this.setState(prevState => {
            const pState = { ...prevState };
            pState.formType = formType;
            return pState;
        });
    };

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    renderAuthForm = () => {
        let isSignup = false;
        switch (this.props.formType) {
            case "signup":
                isSignup = true;
                break;
            case "signin":
                break;
            default:
                return null;
        }
        return (
            <Container className="Auth">
                <Row>
                    <Col />
                    <Col xs={6}>
                        <Form
                            onSubmit={
                                isSignup
                                    ? this.signupHandler
                                    : this.loginHandler
                            }
                            size="sm">
                            <Form.Group controlId="acceptUserName">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    name="username"
                                    type="username"
                                    placeholder="pskanade"
                                    size="sm"
                                    onChange={event =>
                                        this.changeHandler(event)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="acceptUserEmail"
                                hidden={!isSignup}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    size="sm"
                                    onChange={event =>
                                        this.changeHandler(event)
                                    }
                                />
                                <Form.Text className="text-muted">
                                    * We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="acceptUserPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    size="sm"
                                    onChange={event =>
                                        this.changeHandler(event)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="acceptIfProducer"
                                hidden={!isSignup}>
                                <Form.Check
                                    name="isProducer"
                                    type="checkbox"
                                    label="Create Producer Account"
                                    onClick={event =>
                                        this.changeHandler(event)
                                    }
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {isSignup ? "Sign Up" : "Log In"}
                            </Button>
                        </Form>
                    </Col>
                    <Col />
                </Row>
            </Container>
        );
    };

    signupHandler = event => {
        event.preventDefault();
        const signupData = this.getSignupData();
        console.log("[Auth] : Signup Handler");
        // console.log(signupData);
        fetch("http://127.0.0.1:8000/api/user/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        })
            .then(res => res.json())
            .then(jsonData => {
                //This means that one has signed up;
                localStorage.setItem("AnshdataUser", JSON.stringify(jsonData));
                const loginData = this.getLoginData();
                fetch("http://127.0.0.1:8000/api/user/login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                })
                    .then(res => res.json())
                    .then(jsonData => {
                        let AnshdataUser = JSON.parse(
                            localStorage.getItem("AnshdataUser")
                        );
                        AnshdataUser["token"] = jsonData.token;
                        localStorage.setItem(
                            "AnshdataUser",
                            JSON.stringify(AnshdataUser)
                        );
                        // console.log(AnshdataUser);
                    });
            });
        const AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
        console.log("[Auth] Trying to log AnshdataUser");
        console.log(AnshdataUser.username);
    };

    loginHandler = event => {
        event.preventDefault();
        const loginData = this.getLoginData();
        console.log("[Auth] : Login Handler");
        // console.log(loginData);
        fetch("http://127.0.0.1:8000/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(jsonData => {
                let AnshdataToken = jsonData.token;
                fetch("http://127.0.0.1:8000/api/user/me/", {
                    headers: {
                        Authorization: `JWT ${AnshdataToken}`
                    }
                })
                    .then(res => res.json())
                    .then(jsonData => {
                        // NOTE: Here assume no error will occur
                        // console.log(jsonData);
                        let AnshdataUser = jsonData[0]; // we get list so ..
                        AnshdataUser["token"] = AnshdataToken;
                        localStorage.setItem(
                            "AnshdataUser",
                            JSON.stringify(AnshdataUser)
                        );
                        // console.log(AnshdataUser);
                    });
            });
        const AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
        console.log("[Auth] Trying to log AnshdataUser");
        console.log(AnshdataUser);
    };

    componentWillUnmount = () => {
        this.setState({
            username: "",
            email: "",
            password: "",
            isProducer: false
        });
    };

    render() {
        return this.renderAuthForm();
    }
}

export default AuthForm;
