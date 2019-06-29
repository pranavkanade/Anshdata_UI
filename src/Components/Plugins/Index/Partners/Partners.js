import React from "react";

import css from "./Partners.scss";

const PARTNERS = {};

const renderPartners = props => {
  return (
    <div className={css.partners}>
      <div>
        <img src="../../../../../static/assets/logo/freecodecmp.png" />
      </div>
      <div>
        <img src="../../../../../static/assets/logo/Google.png" />
      </div>
      <div className={css.dummy} />
      <div className={css.dummy} />
      <div className={css.dummy} />
      <div className={css.dummy} />
    </div>
  );
};
export default props => {
  return (
    <div className={css.container}>
      <span>Partners</span>
      {renderPartners()}
    </div>
  );
};
