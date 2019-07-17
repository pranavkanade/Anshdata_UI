import React from "react";
import { useRouter } from "next/router";
import DetailedCourse from "../../src/Components/Plugins/Courses/Detailed";

const courses = props => {
  const router = useRouter();
  const { id } = router.query;
  const { asPath } = router;
  console.log("Router ", router);
  return <DetailedCourse courseId={id} viewType={asPath.split("/")[2]} />;
};

export default courses;
