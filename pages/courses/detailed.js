import React from "react";
import App from "../../src/Containers/App";
import DetailedCourse from "../../src/Components/Plugins/Courses/Detailed";

const courses = props => {
  return (
    <App page={"detailedCourse"}>
      <DetailedCourse courseId={props.url.query.id} />
    </App>
  );
};

export default courses;
