import React from "react";

import css from "./AssignmentCard.scss";

export default props => {
  console.log("assignment : ", props.assignment);
  return (
    <div className={css.assignmentCard}>
      <span>{props.assignment.title}</span>
      <div className={css.creds}>
        <div className={css.box}>
          <span className={css.value}>{props.assignment.credit_points}</span>
          <br />
          <span className={css.label}>Credit Points</span>
        </div>
      </div>
    </div>
  );
};
