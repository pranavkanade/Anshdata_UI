import React from "react";
import { useRouter } from "next/router";
import App from "../../src/Containers/App";
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
  return (
    <App page={"DraftCourse"}>
      <DraftedCourse courseId={getCourseId(props)} />
    </App>
  );
};

export default contribDraft;
