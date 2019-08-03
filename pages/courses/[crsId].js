import React from "react";
import DetailedCourse from "../../src/Components/Plugins/Courses/Detailed";

const courses = props => {
  return <DetailedCourse courseId={props.courseId} />;
};

courses.getInitialProps = async ({ query }) => {
  const crsId = query.crsId;
  return { courseId: crsId };
};

export default courses;
