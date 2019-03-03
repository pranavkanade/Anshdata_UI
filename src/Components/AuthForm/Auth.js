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

    signupHandler = async event => {
        event.preventDefault();
        const signupData = this.getSignupData();
        console.log("[Auth] : Signup Handler");
        // console.log(signupData);
        const siginupRes = await fetch(
            "http://127.0.0.1:8000/api/user/signup/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData)
            }
        );
        //This means that one has signed up;
        localStorage.setItem(
            "AnshdataUser",
            JSON.stringify(await siginupRes.json())
        );
        const loginData = this.getLoginData();

        const loginRes = await fetch("http://127.0.0.1:8000/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });
        let AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
        AnshdataUser["token"] = (await loginRes.json()).token;
        localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
    };

    loginHandler = async event => {
        event.preventDefault();
        const loginData = this.getLoginData();
        console.log("[Auth] : Login Handler");

        const loginRes = await fetch("http://127.0.0.1:8000/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        let AnshdataToken = (await loginRes.json()).token;
        const userRes = await fetch("http://127.0.0.1:8000/api/user/me/", {
            headers: {
                Authorization: `JWT ${AnshdataToken}`
            }
        });
        // NOTE: Here assume no error will occur
        // we get list so ..
        let AnshdataUser = (await userRes.json())[0];
        AnshdataUser["token"] = AnshdataToken;
        localStorage.setItem("AnshdataUser", JSON.stringify(AnshdataUser));
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
