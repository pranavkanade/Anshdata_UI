import React from "react";
import { useRouter } from "next/router";

import CourseClassroom from "../../../src/Components/Plugins/Classroom/Classroom";

const course = props => {
  const router = useRouter();
  const { crsId } = router.query;
  return <CourseClassroom courseId={crsId} />;
};

export default course;
