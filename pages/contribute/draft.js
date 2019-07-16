import React from "react";
import { useRouter } from "next/router";

import DraftedCourse from "../../src/Components/Plugins/Contribute/Draft/index";

const getCourseId = props => {
  const router = useRouter();
  const { id } = router.query;
  try {
    const courseId = id;
    return courseId;
  } catch (err) {}
  return undefined;
};

const contribDraft = props => {
  return <DraftedCourse courseId={getCourseId(props)} />;
};

export default contribDraft;
