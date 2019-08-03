import React from "react";
import css from "./courselist.scss";
import { Whisper, Popover } from "rsuite";
import DetailedPop from "../Cards/LgCard/detailedPop";
import { TopCourseCard } from "../Cards/CourseCard";

const renderTopCoursesList = props => {
  return (
    <div className={css.courseList}>
      {props.courses.map(course => {
        return (
          <React.Fragment key={`fragment_course_${course.id}`}>
            <Whisper
              placement="autoHorizontal"
              trigger="click"
              speaker={
                <Popover title={null} style={{ padding: "0px", zIndex: "3" }}>
                  <DetailedPop course={course} askToJoin={props.askToJoin} />
                </Popover>
              }>
              <div className={css.courseCard} key={course.id}>
                {<TopCourseCard course={course} />}
              </div>
            </Whisper>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default renderTopCoursesList;
