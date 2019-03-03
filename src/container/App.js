import React, { Component } from "react";
import Navbar from "../Components/Navbar/Navbar";
import AuthForm from "../Components/AuthForm/Auth";

class App extends Component {
    state = {
        isAuthenticated: !!localStorage.getItem("AnshdataUser"),
        navEventKey: "home",
        AnshdataUser: JSON.parse(localStorage.getItem("AnshdataUser"))
    };

    handleNavbarTransition = eventKey => {
        this.setState({ navEventKey: eventKey });
    };

    renderNavEvent = () => {
        switch (this.state.navEventKey) {
            case "signup":
            case "signin":
                this.renderAuthForm();
                break;
            default:
                return null;
        }
    };

    logoutHandler = event => {
        localStorage.removeItem("AnshdataUser");
        this.setState({ navEventKey: "home" });
    };

    renderAuthForm = () => {
        if (
            this.state.navEventKey === "signup" ||
            this.state.navEventKey === "signin"
        ) {
            return <AuthForm formType={this.state.navEventKey} />;
        }
        return null;
    };

    getUser = () => {
        return JSON.parse(localStorage.getItem("AnshdataUser"));
    };

    componentDidMount = () => {
        const AnshdataUser = this.getUser();
        console.log("[App.js] Trying to log AnshdataUser");
        console.log(AnshdataUser);
    };

    render() {
        return (
            <div className="App">
                <Navbar
                    navHandler={this.handleNavbarTransition}
                    logoutHandler={this.logoutHandler}
                />
                {this.renderAuthForm()}
            </div>
        );
    }
}

export default App;
