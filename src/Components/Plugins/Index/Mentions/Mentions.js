import React from "react";

import css from "./Mentions.scss";

const renderMentions = props => {
  return (
    <div className={css.partners}>
      <div>
        <img src="../../../../../static/assets/logo/techcrunch.png" />
      </div>
      <div>
        <img src="../../../../../static/assets/logo/yourstory.png" />
      </div>
      <div>
        <img src="../../../../../static/assets/logo/toi.png" />
      </div>
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
