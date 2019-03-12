import React, { Component } from "react";
import App from "../src/container/App";
import IndexPlugin from "../src/Components/Plugins/Index/Index";

class Index extends Component {
  render() {
    return (
      <App page="Home">
        <IndexPlugin />
      </App>
    );
  }
}

export default Index;
