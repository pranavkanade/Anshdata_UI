import React, { Component } from "react";
import App from "../../src/container/App";
import Contribution from "../../src/container/Contribution";

class ContributeCourse extends Component {
  render() {
    return (
      <App page="Contribute">
        <Contribution />
      </App>
    );
  }
}

export default ContributeCourse;
