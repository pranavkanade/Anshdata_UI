import React from "react";

import CourseClassroom from "../../../src/Components/Plugins/Classroom/Classroom";

const course = props => {
  return <CourseClassroom courseId={props.courseId} />;
};

course.getInitialProps = async ({ query }) => {
  const crsId = query.crsId;
  return { courseId: crsId };
};

export default course;
