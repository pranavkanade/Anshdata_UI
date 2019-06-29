import React from "react";
import App from "../../src/Containers/App";
import DraftedCourse from "../../src/Components/Plugins/Contribute/Draft/index";

const getCourseId = props => {
  try {
    const courseId = props.url.query.id;
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
