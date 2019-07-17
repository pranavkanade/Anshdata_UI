import React from "react";
import { useRouter } from "next/router";

import CourseClassroom from "../../src/Components/Plugins/Classroom/Classroom";

const course = props => {
  const router = useRouter();
  const { id } = router.query;
  return <CourseClassroom courseId={id} />;
};

export default course;
