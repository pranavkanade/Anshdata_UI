import React from "react";
import css from "./ribbon.scss";

export default props => (
  <div className={css.ribbon}>
    <span>{props.text}</span>
  </div>
);
