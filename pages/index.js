import React, { Component } from "react";
import App from "../src/container/App";

class Index extends Component {
  render() {
    return (
      <App page="Home">
        <div>
          <h3>This is index page of Anshdata</h3>
        </div>
      </App>
    );
  }
}

export default Index;
