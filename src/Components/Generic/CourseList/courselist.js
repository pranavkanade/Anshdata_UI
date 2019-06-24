import React from "react";
import css from "./courselist.scss";

import { PublishedCard } from "../Cards/CourseCard";
import LgDrafedCourseCard from "../Cards/LgCard/draftcard";

const getCourseList = props => {
  return props.courses.map(course => {
    return (
      <div key={course.id}>
        <div
          className={
            css.courseCard +
            " " +
            (course.id === props.selectedCourse ? css.active : "")
          }
          onClick={() => props.setSelectedCourse(course.id)}>
          <PublishedCard course={course} />
        </div>
        {course.id === props.selectedCourse ? (
          <LgDrafedCourseCard
            course={course}
            closeSelectedCourse={props.closeSelectedCourse}
            activeTab={props.activeTab}
          />
        ) : null}
      </div>
    );
  });
};

const renderCourseList = props => {
  return <div className={css.courseList}>{getCourseList(props)}</div>;
};

export default renderCourseList;
