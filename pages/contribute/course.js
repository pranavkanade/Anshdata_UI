import React from "react";
import App from "../../src/Containers/App";
import Course from "../../src/Components/Plugins/Contrib/Course";

const getCourseId = props => {
  try {
    const courseId = props.url.query.id;
    return courseId;
  } catch (err) {}
  return undefined;
};

const contribCourse = props => {
  return (
    <App page={"ContribCourse"}>
      <Course courseId={getCourseId(props)} />
    </App>
  );
};

export default contribCourse;
