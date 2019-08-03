import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Error from "../../../src/Components/Generic/Error/error";

import DraftedCourse from "../../../src/Components/Plugins/Contribute/Draft/index";

const contribDraft = props => {
  const isServer = typeof window === "undefined";
  if (!isServer && !props.isAuthenticated) {
    return <Error />;
  }
  return <DraftedCourse courseId={props.courseId} />;
};

contribDraft.getInitialProps = async ({ query, isAuthenticated }) => {
  const crsId = query.crsId;
  return { courseId: crsId, isAuthenticated: isAuthenticated };
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(mapStateToProps)(contribDraft);
