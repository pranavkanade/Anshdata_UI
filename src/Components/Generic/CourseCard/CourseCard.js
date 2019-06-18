import React, { Component } from "react";

import css from "./CourseCard.scss";

// TODO: Make this turn rating in to three vals - full, half, null
// EG - 3.5 => full: 3, half: 1, null: 1

// NOTE: For now rating is whole number
const RenderRating = (rating = 5) => {
  const ratingArr = [...Array(rating).keys()];

  return (
    <>
      {ratingArr.map(i => (
        <img
          src="./../../../../static/assets/icon/star_24px_outlined.svg"
          id={i}
        />
      ))}
    </>
  );
};

export const PublishedCard = props => {
  const course = props.course;
  const title =
    course !== null && course !== undefined
      ? course.title
      : "This is Course Title";

  const creditPoints =
    course !== null && course !== undefined ? course.credit_points : "10";
  return (
    <div className={css.published}>
      <div className={css.intro}>
        {/*
      TODO: Edit this iframe as you create intro links for courses
      */}
        <iframe
          src="https://www.youtube.com/embed/RKLKib4bHhA"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <div className={css.title}>
        <span>{title}</span>
      </div>
      <div className={css.rating}>{RenderRating()}</div>
      <div className={css.credits}>
        <span>Credit Points</span>
        <span>{creditPoints}</span>
      </div>
    </div>
  );
};
