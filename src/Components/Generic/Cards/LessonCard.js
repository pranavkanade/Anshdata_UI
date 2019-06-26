import React from "react";

import css from "./LessonCard.scss";

export default props => {
  return (
    <div className={css.lessonCard}>
      <div className={css.lesson}>
        <iframe
          src="https://www.youtube.com/embed/RKLKib4bHhA"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <span>{props.lesson.title}</span>
      </div>
      <div className={css.actionBox}>
        <div className={css.editBar}>
          <button className={css.edit}>
            <img src="../../../../static/assets/icon/create_24px_outlined.svg" />
          </button>
          <button className={css.delete}>
            <img src="../../../../static/assets/icon/delete_sweep_24px_outlined.svg" />
          </button>
          <button className={css.fullscreen}>
            <img src="../../../../static/assets/icon/fullscreen_24px_outlined_light.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};
