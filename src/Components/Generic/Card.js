/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import StyleClasses from "./generic.scss";

export default props => {
  return (
    <div className="col s2 center-align grey-text text-lighten-5">
      <div class={"card " + StyleClasses.card}>
        <div class="card-content">
          <h2 className={StyleClasses.headShadow}>{props.content}</h2>
        </div>
        <span class="card-title">{props.title}</span>
      </div>
    </div>
  );
};
