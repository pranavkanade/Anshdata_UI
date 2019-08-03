import React from "react";

import css from "./Mentions.scss";

const renderMentions = props => {
  return (
    <div className={css.partners}>
      <div className={css.dummy} />
      <div className={css.dummy} />
      <div className={css.dummy} />
    </div>
  );
};
export default props => {
  return (
    <div className={css.container}>
      <span>Mentions</span>
      {renderMentions()}
    </div>
  );
};
