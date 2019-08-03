import React from "react";
import Link from "next/link";
import css from "./courselist.scss";
import { Whisper, Popover } from "rsuite";
import DetailedPop from "../Cards/LgCard/detailedPop";
import {
  PublishedCard,
  EnrolledCourseCard,
  DraftCourseCard,
  TopCourseCard
} from "../Cards/CourseCard";
import LgDrafedCourseCard from "../Cards/LgCard/draftcard";

const getDetailedCard = (
  course,
  type,
  activeTab,
  closeSelectedCourse,
  askToJoin = () => {}
) => {
  if (type === "drafts") {
    return (
      <LgDrafedCourseCard
        course={course}
        closeSelectedCourse={closeSelectedCourse}
        activeTab={activeTab}
        key={`detailed_draft_course_${course.id}`}
      />
    );
  }
  return null;
};

const getCourseList = (props, type) => {
  let CourseCard = null;
  if (type === "enrolled") {
    CourseCard = EnrolledCourseCard;
  } else if (type === "top") {
    CourseCard = TopCourseCard;
  } else if (type === "drafts" && props.activeTab !== "publication") {
    CourseCard = DraftCourseCard;
  } else {
    CourseCard = PublishedCard;
  }

  return props.courses.map(course => {
    return (
      <React.Fragment key={`fragment_course_${course.id}`}>
        <div
          className={
            css.courseCard +
            " " +
            (course.id === props.selectedCourse && type !== "enrolled"
              ? css.active
              : "")
          }
          key={course.id}
          onClick={() => props.setSelectedCourse(course.id)}>
          {<CourseCard course={course} />}
        </div>
        {course.id === props.selectedCourse
          ? getDetailedCard(
              course,
              type,
              type === "drafts" ? props.activeTab : props.courseListType,
              props.closeSelectedCourse,
              props.askToJoin
            )
          : null}
      </React.Fragment>
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
    <div className={css.courseList}>
      {props.courses.map(course => {
        return (
          <React.Fragment key={`fragment_course_${course.id}`}>
            <Whisper
              placement="autoHorizontal"
              trigger="click"
              onClose={props.closeSelectedCourse}
              speaker={
                <Popover title={null} style={{ padding: "0px", zIndex: "3" }}>
                  <DetailedPop course={course} askToJoin={props.askToJoin} />
                </Popover>
              }>
              <div
                className={
                  css.courseCard +
                  " " +
                  (course.id === props.selectedCourse ? css.active : "")
                }
                key={course.id}
                onClick={() => props.setSelectedCourse(course.id)}>
                {<PublishedCard course={course} />}
              </div>
            </Whisper>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const renderTopCoursesList = props => {
  return (
    <div className={css.courseList}>
      {props.courses.map(course => {
        return (
          <React.Fragment key={`fragment_course_${course.id}`}>
            <Whisper
              placement="autoHorizontal"
              trigger="click"
              onClose={props.closeSelectedCourse}
              speaker={
                <Popover title={null} style={{ padding: "0px", zIndex: "3" }}>
                  <DetailedPop course={course} askToJoin={props.askToJoin} />
                </Popover>
              }>
              <div
                className={
                  css.courseCard +
                  " " +
                  (course.id === props.selectedCourse ? css.active : "")
                }
                key={course.id}>
                {<TopCourseCard course={course} />}
              </div>
            </Whisper>
          </React.Fragment>
        );
      })}
    </div>
  );
};
