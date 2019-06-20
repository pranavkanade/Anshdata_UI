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
    </div>
  );
};
