import React from "react";
import App from "../../src/Containers/App";
import Courses from "../../src/Components/Plugins/Courses/Courses";

const courses = () => {
  return (
    <App page={"Courses"}>
      <Courses />
    </App>
  );
};

export default courses;
