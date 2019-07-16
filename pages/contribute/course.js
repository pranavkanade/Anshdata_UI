import React from "react";
import { useRouter } from "next/router";
import CourseForm from "../../src/Components/Plugins/Contribute/Course/course";

const getCourseId = props => {
  const router = useRouter();
  try {
    const { id } = router.query;
    return id;
  } catch (err) {}
  return undefined;
};

const contribCourse = props => {
  return <CourseForm courseId={getCourseId(props)} />;
};

export default contribCourse;
