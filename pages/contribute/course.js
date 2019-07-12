import React from "react";
import { useRouter } from "next/router";
import App from "../../src/Containers/App";
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
  return (
    <App page={"ContribCourse"}>
      <CourseForm courseId={getCourseId(props)} />
    </App>
  );
};

export default contribCourse;
