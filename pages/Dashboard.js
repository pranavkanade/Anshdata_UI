import React, { Component } from "react";
import App from "../src/container/App";
import DashboardPlugin from "../src/Components/Plugins/Dashboard/Dashboard";

class Dashboard extends Component {
  render() {
    return (
      <App page="Dashboard">
        <DashboardPlugin />
      </App>
    );
  }
}

export default Dashboard;
