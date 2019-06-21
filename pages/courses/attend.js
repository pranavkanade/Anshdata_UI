import React from "react";
import App from "../../src/Containers/App";
import CourseClassroom from "../../src/Components/Plugins/Classroom/Classroom";

const course = props => {
  return (
    <App page={"courseClassroom"}>
      <CourseClassroom courseId={props.url.query.id} />
    </App>
  );
};

export default course;
