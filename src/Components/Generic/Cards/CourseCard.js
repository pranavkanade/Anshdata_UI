import React, { Component } from "react";
import ReactPlayer from "react-player";

import css from "./CourseCard.scss";
import { Progress } from "rsuite";

// TODO: Make this turn rating in to three vals - full, half, null
// EG - 3.5 => full: 3, half: 1, null: 1

// NOTE: For now rating is whole number

const { Circle, Line } = Progress;

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

const renderHead = (
  title,
  lecture = "https://www.youtube.com/embed/RKLKib4bHhA"
) => {
  return (
    <div className={css.head}>
      <div className={css.intro}>
        <ReactPlayer
          url={lecture}
          height="100%"
          width="100%"
          playing={false}
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
  let lecture = "https://www.youtube.com/embed/RKLKib4bHhA";
  try {
    const backup = "https://www.youtube.com/embed/RKLKib4bHhA";
    lecture = props.course.modules[0].lessons[0].lecture;
    lecture = lecture === "" || lecture === null ? backup : lecture;
    console.log("Found lecure : ", course.id, lecture);
  } catch (err) {
    console.log("Doest not have lectures : ", course.id);
  }
  const title = course.title;
  const creditPoints = course.credit_points;
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

export const TopCourseCard = props => {
  const course = props.course;
  let lecture = "https://www.youtube.com/embed/RKLKib4bHhA";
  try {
    const backup = "https://www.youtube.com/embed/RKLKib4bHhA";
    lecture = props.course.modules[0].lessons[0].lecture;
    lecture = lecture === "" || lecture === null ? backup : lecture;
    console.log("Found lecure : ", course.id, lecture);
  } catch (err) {
    console.log("Doest not have lectures : ", course.id);
  }
  const title = course.title;
  const creditPoints = course.credit_points;
  const enrollments = course.students_count;
  return (
    <div className={css.published}>
      {renderHead(title, lecture)}
      <div className={css.rating}>{RenderRating()}</div>
      <div className={css.credits}>
        <span>Credit Points</span>
        <span>{creditPoints}</span>
      </div>
      <div className={css.credits}>
        <span>Students</span>
        <span>{enrollments}</span>
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
        <Line percent={progress} strokeColor="#2e229e" status={null} />
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
