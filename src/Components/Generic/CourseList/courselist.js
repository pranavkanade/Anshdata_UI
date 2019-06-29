import React from "react";
import Router from "next/router";
import css from "./courselist.scss";

import { PublishedCard, EnrolledCourseCard } from "../Cards/CourseCard";
import LgDrafedCourseCard from "../Cards/LgCard/draftcard";
import LgDetailedCourseCard from "../Cards/LgCard/publishedCard";

const getDetailedCard = (course, type, activeTab, closeSelectedCourse) => {
  if (type === "drafts") {
    return (
      <LgDrafedCourseCard
        course={course}
        closeSelectedCourse={closeSelectedCourse}
        activeTab={activeTab}
      />
    );
  }
  return (
    <LgDetailedCourseCard
      course={course}
      closeSelectedCourse={closeSelectedCourse}
      courseListType={activeTab}
    />
  );
};

const getCourseList = (props, type) => {
  return props.courses.map(course => {
    return (
      <>
        <div
          className={
            css.courseCard +
            " " +
            (course.id === props.selectedCourse && type !== "enrolled"
              ? css.active
              : "")
          }
          key={course.id}
          onClick={
            type !== "enrolled"
              ? () => props.setSelectedCourse(course.id)
              : () => Router.push(`/courses/attend/${course.id}`)
          }>
          {type === "enrolled" ? (
            <EnrolledCourseCard course={course} />
          ) : (
            <PublishedCard course={course} />
          )}
        </div>
        {course.id === props.selectedCourse && type !== "enrolled"
          ? getDetailedCard(
              course,
              type,
              type === "drafts" ? props.activeTab : props.courseListType,
              props.closeSelectedCourse
            )
          : null}
      </>
    );
  });
};

export const renderDraftCoursesList = props => {
  return (
    <div className={css.courseList}>{getCourseList(props, "drafts")}</div>
  );
};

export const renderPublishedCoursesList = props => {
  return (
    <div className={css.courseList}>{getCourseList(props, "published")}</div>
  );
};

export const renderEnrolledCoursesList = props => {
  return (
    <div className={css.courseList + " " + css.enrolled}>
      {getCourseList(props, "enrolled")}
    </div>
  );
};
