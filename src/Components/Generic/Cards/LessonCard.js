import React from "react";

import ReactPlayer from "react-player";
import css from "./LessonCard.scss";

export const draftLessonCard = props => {
  return (
    <div className={css.lessonCard}>
      <div className={css.lesson}>
        <ReactPlayer
          url={props.lesson.lecture}
          controls
          pip={true}
          height="100%"
          width="100%"
        />
      </div>
      <p>
        {props.lesson.title.substring(0, 50)}
        {props.lesson.title.length > 50 ? "..." : ""}
      </p>
      <div className={css.actionBox}>
        <div className={css.editBar}>
          <button
            className={css.edit}
            onClick={() =>
              props.modify("lesson", props.lesson.module, props.lesson.id)
            }>
            <img src="../../../../static/assets/icon/create_24px_outlined.svg" />
          </button>
          <button className={css.delete}>
            <img src="../../../../static/assets/icon/delete_sweep_24px_outlined.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const LessonCard = props => {
  return (
    <div className={css.lessonCard}>
      <div className={css.lesson}>
        <ReactPlayer
          url={props.lesson.lecture}
          controls
          pip={true}
          height="100%"
          width="100%"
        />
      </div>
      <p>
        {props.lesson.title.substring(0, 50)}
        {props.lesson.title.length > 50 ? "..." : ""}
      </p>
    </div>
  );
};
