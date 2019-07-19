import React from "react";
import { useRouter } from "next/router";

import DraftedCourse from "../../../src/Components/Plugins/Contribute/Draft/index";

const contribDraft = props => {
  const router = useRouter();
  const { crsId } = router.query;
  return <DraftedCourse courseId={crsId} />;
};

export default contribDraft;
