import React from "react";

import css from "./AssignmentCard.scss";

export default props => {
  console.log("assignment : ", props.assignment);
  return (
    <div className={css.assignmentCard}>
      <span>{props.assignment.title}</span>
      <div className={css.actionBox}>
        <div className={css.editBar}>
          <button
            className={css.edit}
            onClick={() =>
              props.modify(
                "assignment",
                props.assignment.module,
                props.assignment.lesson,
                props.assignment.id
              )
            }>
            <img src="../../../../static/assets/icon/create_24px_outlined.svg" />
          </button>
          <button className={css.delete}>
            <img src="../../../../static/assets/icon/delete_sweep_24px_outlined.svg" />
          </button>
          <button className={css.fullscreen}>
            <img src="../../../../static/assets/icon/fullscreen_24px_outlined.svg" />
          </button>
        </div>
        <div className={css.creds}>
          <span className={css.value}>{props.assignment.credit_points}</span>
          <br />
          <span className={css.label}>Credit Points</span>
        </div>
      </div>
    </div>
  );
};
