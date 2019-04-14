import React from "react";
import App from "../../src/Containers/App";
import Course from "../../src/Components/Plugins/Contrib/Course/Course";

const contribCourse = () => {
  return (
    <App page={"ContribCourse"}>
      <Course />
    </App>
  );
};

export default contribCourse;
