import React from "react";
import App from "../../src/Containers/App";
import CourseForm from "../../src/Components/Plugins/Contribute/Course/course";

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
      <CourseForm courseId={getCourseId(props)} />
    </App>
  );
};

export default contribCourse;
