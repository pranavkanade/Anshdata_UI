import React from "react";
import Link from "next/link";
import css from "./courselist.scss";
import { EnrolledCourseCard } from "../Cards/CourseCard";
import { connect } from "react-redux";
import { updateCurrentCourse } from "../../../store/actions";

const renderEnrolledCoursesList = props => {
  return (
    <div className={css.courseList + " " + css.enrolled}>
      {props.courses.map(course => {
        return (
          <Link
            key={course.id}
            href="/courses/attend/[crsId]"
            as={`/courses/attend/${course.id}`}>
            <div
              className={css.courseCard}
              onClick={() => props.updateCurrentCourse(course)}>
              {<EnrolledCourseCard course={course} />}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = {
  updateCurrentCourse
};

export default connect(
  null,
  mapDispatchToProps
)(renderEnrolledCoursesList);
