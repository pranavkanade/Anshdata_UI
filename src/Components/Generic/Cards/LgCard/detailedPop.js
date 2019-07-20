import React from "react";
import Link from "next/link";
import { Whisper, Tooltip } from "rsuite";
import css from "./detailedPop.scss";
import { connect } from "react-redux";
import { enrollEventHandler } from "../../../../Requests/Enrollment";

const renderActionBtn = (courseId, isAuthenticated, askToJoin) => {
  if (isAuthenticated) {
    return (
      <Link href="/courses/attend/[crsId]" as={`/courses/attend/${courseId}`}>
        <button
          className={css.actionBtn}
          onClick={() => enrollEventHandler(courseId)}>
          <span>Enroll</span>
          <img src={"/static/assets/icon/add_24px_outlined.svg"} />
        </button>
      </Link>
    );
  } else {
    return (
      <Whisper
        trigger="hover"
        placement="top"
        speaker={
          <Tooltip>User should be logged in to Enroll to this course.</Tooltip>
        }>
        <button
          className={css.actionBtn}
          onClick={() => {
            askToJoin();
          }}>
          <span>Enroll</span>
          <img src={"/static/assets/icon/lock_24px_outlined.svg"} />
        </button>
      </Whisper>
    );
  }
};

const speaker = props => {
  const { course } = props;
  return (
    <div className={css.detailedPop}>
      <p className={css.title}>{course.title}</p>
      <p className={css.description}>
        {course.description.substring(0, 192)}..
      </p>
      <div className={css.stats}>
        <div className={css.item}>
          <span>{course.author.username}</span>
          <br />
          <span className={css.label}>Author</span>
        </div>
        <div className={css.item}>
          <img src="/static/assets/icon/star_24px_outlined.svg" />
          <span>4.3</span>
          <br />
          <span className={css.label}>Rating</span>
        </div>
        <div className={css.item}>
          <img src="/static/assets/icon/person_add_24px_outlined.svg" />
          <span>{course.students_count}</span>
          <br />
          <span className={css.label}>Enrollments</span>
        </div>
        <div className={css.item}>
          <img src="/static/assets/icon/attach_money_24px_outlined.svg" />
          <span>{course.credit_points}</span>
          <br />
          <span className={css.label}>Award Credits</span>
        </div>
      </div>
      {renderActionBtn(course.id, props.isAuthenticated, props.askToJoin)}
      <div />
    </div>
  );
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(mapStateToProps)(speaker);
