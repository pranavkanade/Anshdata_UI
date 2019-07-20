import React, { useState } from "react";
import { Whisper, Tooltip, Button } from "rsuite";
import css from "./detailedPop.scss";
import { connect } from "react-redux";
import { enrollToCourse } from "../../../../store/actions";

const renderActionBtn = (
  course,
  isAuthenticated,
  enrollToCourse,
  askToJoin,
  isEnrolling,
  setEnrolling
) => {
  if (isAuthenticated) {
    return (
      <Button
        appearance="primary"
        className={css.actionBtn}
        onClick={() => {
          setEnrolling(true);
          enrollToCourse(course);
        }}
        loading={isEnrolling}>
        <span>Enroll</span>
        {!isEnrolling ? (
          <img src={"/static/assets/icon/add_24px_outlined.svg"} />
        ) : null}
      </Button>
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
  const [isEnrolling, setIfEnrolling] = useState(false);
  const { course, currentCourse } = props;
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
      {renderActionBtn(
        course,
        props.isAuthenticated,
        props.enrollToCourse,
        props.askToJoin,
        isEnrolling,
        setIfEnrolling
      )}
      <div />
    </div>
  );
};

const mapDispatchToProps = {
  enrollToCourse
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(speaker);
