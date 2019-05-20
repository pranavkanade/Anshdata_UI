import React from "react";
import App from "../../src/Containers/App";
import AttendCourse from "../../src/Components/Plugins/Courses/Attend/Attend";

const course = props => {
  return (
    <App page={"attendCourse"}>
      <AttendCourse courseId={props.url.query.id} />
    </App>
  );
};

export default course;
