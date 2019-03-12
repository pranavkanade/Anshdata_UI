import React, { Component } from "react";
import App from "../src/container/App";
import ProfilePlugin from "../src/Components/Plugins/Profile/Profile";

class Dashboard extends Component {
  render() {
    return (
      <App page="Profile">
        <ProfilePlugin />
      </App>
    );
  }
}

export default Dashboard;
