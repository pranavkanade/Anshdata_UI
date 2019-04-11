import React, { Component } from "react";
import App from "../src/container/App";
import ContributePlugin from "../src/Components/Plugins/Contribute/Contribute";

class Contribute extends Component {
  render() {
    return (
      <App page="Contribute">
        <ContributePlugin />
      </App>
    );
  }
}

export default Contribute;
