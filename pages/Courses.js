import React, { Component } from "react";
import App from "../src/container/App";
import CoursesPlugin from "../src/Components/Plugins/Courses/Courses";

class Courses extends Component {
  render() {
    return (
      <App page="Courses">
        <CoursesPlugin />
      </App>
    );
  }
}

export default Courses;
