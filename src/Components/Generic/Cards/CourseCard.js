import React, { Component } from "react";

import css from "./CourseCard.scss";
import { Progress } from "semantic-ui-react";

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
          key={i}
        />
      ))}
    </>
  );
};

const renderHead = (title, lecture) => {
  return (
    <div className={css.head}>
      <div className={css.intro}>
        {/*
  TODO: Edit this iframe as you create intro links for courses
  */}
        <iframe
          src="https://www.youtube.com/embed/RKLKib4bHhA"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={css.title}>
        <span>{title}</span>
      </div>
    </div>
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
      {renderHead(title)}
      <div className={css.rating}>{RenderRating()}</div>
      <div className={css.credits}>
        <span>Credit Points</span>
        <span>{creditPoints}</span>
      </div>
    </div>
  );
};

export const EnrolledCourseCard = props => {
  const course = props.course;
  const title =
    course !== null && course !== undefined
      ? course.title
      : "This is Course Title";
  const progress = 63;

  return (
    <div className={css.enrolled}>
      {renderHead(title)}
      <div className={css.progress}>
        <Progress percent={progress} size="tiny" color="teal" />
      </div>
    </div>
  );
};

export const DraftCourseCard = props => {
  const course = props.course;
  const title =
    course !== null && course !== undefined
      ? course.title
      : "This is Course Title";

  return (
    <div className={css.drafted}>
      {renderHead(title)}
      <div className={css.category}>
        <span className={css.value}>{course.category.title}</span>
        <br />
        <span className={css.label}>Category</span>
      </div>
    </div>
  );
};
