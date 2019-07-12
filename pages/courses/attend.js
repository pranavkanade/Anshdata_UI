import React from "react";
import { useRouter } from "next/router";
import App from "../../src/Containers/App";
import CourseClassroom from "../../src/Components/Plugins/Classroom/Classroom";

const course = props => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <App page={"courseClassroom"}>
      <CourseClassroom courseId={id} />
    </App>
  );
};

export default course;
