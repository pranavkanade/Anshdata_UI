import React, { useState, Component } from "react";
import Link from "next/link";
import { Whisper, Tooltip, Button } from "rsuite";
import css from "./detailedPop.scss";
import { connect } from "react-redux";
import { enrollToCourse, fetchUserProgress } from "../../../../store/actions";

class DetailedPopup extends Component {
  state = {
    isEnrolling: false
  };

  ifEnrolled = () => {
    const { course, userProgress, user, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return false;
    }
    if (!userProgress) {
      return false;
    }
    const pEnrtry = userProgress.filter(p => {
      return p.course === course.id && p.candidate === user.pk;
    });

    return pEnrtry.length;
  };

  renderActionBtn = () => {
    const { course } = this.props;
    if (!!this.ifEnrolled()) {
      if (this.state.isEnrolling) {
        this.setState({ isEnrolling: false });
      }
      return (
        <Link
          href="/courses/attend/[crsId]"
          as={`/courses/attend/${course.id}`}>
          <Button
            appearance="primary"
            className={css.actionBtn + " " + css.attend}>
            <span>Attend</span>
            <img
              src={"/static/assets/icon/play_circle_outline_24px_outlined.svg"}
            />
          </Button>
        </Link>
      );
    } else if (this.props.isAuthenticated) {
      return (
        <Button
          appearance="primary"
          className={css.actionBtn}
          onClick={() => {
            this.setState({ isEnrolling: true });
            this.props.enrollToCourse(course);
          }}
          loading={this.state.isEnrolling}>
          <span>Enroll</span>
          {!this.state.isEnrolling ? (
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
            <Tooltip>
              User should be logged in to Enroll to this course.
            </Tooltip>
          }>
          <button
            className={css.actionBtn}
            onClick={() => {
              this.props.askToJoin();
            }}>
            <span>Enroll</span>
            <img src={"/static/assets/icon/lock_24px_outlined.svg"} />
          </button>
        </Whisper>
      );
    }
  };

  render() {
    const { course } = this.props;
    return (
      <div className={css.detailedPop}>
        <Link href="/courses/[crsId]" as={`/courses/${course.id}`}>
          <p className={css.title}>{course.title}</p>
        </Link>
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
        {this.renderActionBtn()}
        <div />
      </div>
    );
  }

  componentDidMount() {
    if (!this.props.userProgress && this.props.isAuthenticated) {
      this.props.fetchUserProgress();
    }
  }
}

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
      <Link href="/courses/[crsId]" as={`/courses/${course.id}`}>
        <p className={css.title}>{course.title}</p>
      </Link>
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
  enrollToCourse,
  fetchUserProgress
};

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.user;
  const { userProgress } = state.crs;
  return { isAuthenticated, user, userProgress };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedPopup);
