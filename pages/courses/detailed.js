import React from "react";
import App from "../../src/Containers/App";
import DetailedCourse from "../../src/Components/Plugins/Courses/Detailed";

const courses = props => {
  console.log(props.url.asPath);
  return (
    <App page={"detailedCourse"}>
      <DetailedCourse
        courseId={props.url.query.id}
        viewType={props.url.asPath.split("/")[2]}
      />
    </App>
  );
};

export default courses;
