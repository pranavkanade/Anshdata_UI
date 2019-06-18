import React from "react";
import { enrollEventHandler } from "../../../Requests/Enrollment";
// import { courseListType } from "../../../globals";
// import Link from "next/link";
import css from "./courselist.scss";

import { PublishedCard } from "../Cards/CourseCard";
import DetailedCard from "../Cards/DetailedCard";

const renderCoursesList = props => {
  return props.courses.map(course => {
    const id = course["id"];
    return (
      <>
        <div
          className={css.courseCard}
          key={id}
          onClick={() => props.setSelectedCourse(id)}>
          <PublishedCard course={course} />
        </div>
        {id === props.selectedCourse ? (
          <DetailedCard
            course={course}
            closeSelectedCourse={props.closeSelectedCourse}
          />
        ) : null}
      </>
    );
  });
};

export default renderCoursesList;
