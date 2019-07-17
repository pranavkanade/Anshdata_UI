import React from "react";
import { useRouter } from "next/router";
import DetailedCourse from "../../src/Components/Plugins/Courses/Detailed";

const courses = () => {
  const router = useRouter();
  const { crsId } = router.query;
  console.log("course ID ", crsId);
  return <DetailedCourse courseId={crsId} />;
};

export default courses;
