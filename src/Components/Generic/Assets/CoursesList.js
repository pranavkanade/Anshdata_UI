import React from "react";
// import { enrollEventHandler } from "../../../Requests/Enrollment";
// import { courseListType } from "../../../globals";
// import Link from "next/link";
import css from "./courselist.scss";

import { PublishedCard } from "../../Generic/CourseCard/CourseCard";

// const renderEnrollButton = course => {
//   return (
//     <button
//       onClick={() => enrollEventHandler(course["id"])}
//       className={css.enrollBtn}>
//       <text>Enroll</text>
//     </button>
//   );
// };

// const renderModifyButtons = course => {
//   return (
//     <button
//       onClick={() => {
//         console.log("[Contirb.js] Modify button clicked");
//       }}
//       className={css.modifyBtn}>
//       <text>Modify</text>
//     </button>
//   );
// };

// const renderContinueButton = course => {
//   // send to attend the course
//   return (
//     <button
//       onClick={() => {
//         console.log("[Contirb.js] Attend button clicked");
//       }}
//       className={css.attendBtn}>
//       <text>Attend</text>
//     </button>
//   );
// };

// const renderActionButtons = (course, type) => {
//   if (type === courseListType.MODIFY) {
//     return renderModifyButtons(course);
//   } else if (type === courseListType.LIST) {
//     return renderEnrollButton(course);
//   }
//   return renderContinueButton(course);
// };

const renderCoursesList = props => {
  return props.courses.map(course => {
    return (
      <div className={css.courseCard} key={course["id"]}>
        <PublishedCard course={course} />
      </div>
    );
  });
};

export default renderCoursesList;

// TODO: Add the link - href={`${props.detailURL}/${course["id"]}`}
{
  /*
            <div className={css.courseCard} key={course["id"]}>
        <a className={css.linked} href={`${props.detailURL}/${course["id"]}`}>
          <div className={css.title}>
            <em>
              <p>{course.title}</p>
            </em>
          </div>
          <div className={css.descriptionBox}>
            <p>{course.description.slice(0, 30)} ...</p>
          </div>
        </a>
        <div className={css.credNratingBox}>
          <div className={css.ratingBox}>
            <text className={css.heading}>Rating</text>
            <div />
      */
}
{
  /** TODO: Add rating images */
}
{
  /*
                              </div>
          <div className={css.creditBox}>
            <text className={css.heading}>Credit Point</text>
            <text className={css.value}>{course.credit_points}</text>
          </div>
        </div>
        <div className={css.subCatBox}>
          <div className={css.subjectBox}>
            <text className={css.value}>{course.subject}</text>
          </div>
          <div className={css.categoryBox}>
            <text className={css.value}>{course.category.title}</text>
          </div>
        </div>
        <div className={css.authorBox}>
          <text className={css.heading}>Author</text>
          <text className={css.value}>{course.author.username}</text>
        </div>
              {renderActionButtons(course, props.courseListType)}
      </div>
      */
}
