import React, { Component } from "react";
import Link from "next/link";

import css from "./publishedCard.scss";

import { ModuleCardMd } from "../ModuleCard";
import { getCourse } from "../../../../Requests/Courses";
import { enrollEventHandler } from "../../../../Requests/Enrollment";
import { courseListType } from "../../../../globals";
import { connect } from "react-redux";
import { Whisper, Tooltip } from "rsuite";

class DetailedCourseCard extends Component {
  state = {
    course: this.props.course
  };

  courseSaveHandler = course => {
    this.setState({ course });
  };

  RenderRating = (rating = 5) => {
    const ratingArr = [...Array(rating).keys()];

    return (
      <>
        {ratingArr.map(i => (
          <img
            src="./../../../../static/assets/icon/star_24px_outlined.svg"
            key={i}
          />
        ))}
      </>
    );
  };

  renderActionBtn = courseId => {
    if (this.props.isAuthenticated) {
      return (
        <Link
          href="/courses/attend/[crsId]"
          as={`/courses/attend/${courseId}`}>
          <button
            className={css.enroll}
            onClick={() => enrollEventHandler(courseId)}>
            <span>Enroll</span>
            <img
              src={"../../../../static/assets/icon/add_24px_outlined.svg"}
            />
          </button>
        </Link>
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
          <button className={css.enroll} onClick={this.props.askToJoin}>
            <span>Enroll</span>
            <img src={"/static/assets/icon/lock_24px_outlined.svg"} />
          </button>
        </Whisper>
      );
    }
  };

  renderStats = (
    courseId,
    author = "John Doe",
    creditPoints = 10,
    assignments = 3,
    enrollment = 203,
    rating = 5
  ) => {
    return (
      <div className={css.statsBox}>
        <div className={css.stat}>
          <span className={css.value}>{this.RenderRating(rating)}</span>
          <br />
          <span className={css.label}>Rating</span>
        </div>
        <div className={css.stat}>
          <span className={css.value}>{enrollment}</span>
          <br />
          <span className={css.label}>Enrollments</span>
        </div>
        <div className={css.stat}>
          <span className={css.value}>{creditPoints}</span>
          <br />
          <span className={css.label}>Credit Points</span>
        </div>
        <div className={css.stat}>
          <span className={css.value}>{assignments}</span>
          <br />
          <span className={css.label}>Assignments</span>
        </div>
        <div className={css.stat}>
          <span className={css.value}>{author}</span>
          <br />
          <span className={css.label}>Author</span>
        </div>
        {this.renderActionBtn(courseId)}
      </div>
    );
  };

  render() {
    const { course } = this.state;
    if (course === null) {
      return <div className={css.detailedCourse}>Test</div>;
    }
    return (
      <div className={css.detailedCourse}>
        <div className={css.head}>
          <Link href="/courses/[crsId]" as={`/courses/${course.id}`}>
            <span>{course.title}</span>
          </Link>
          <button
            className={css.arrows}
            onClick={this.props.closeSelectedCourse}>
            <img src="../../../../static/assets/icon/clear_24px_outlined.svg" />
          </button>
        </div>
        <p>{course.description}</p>
        {this.renderStats(
          course.id,
          course.author.username,
          course.credit_points,
          course.assignments.length
        )}
        <div className={css.secondaryBox}>
          <div className={css.modulesBox}>
            <span>Modules</span>
            <div className={css.modCard}>
              <button className={css.arrows}>
                <img src="../../../../static/assets/icon/arrow_back_ios_24px_outlined.svg" />
              </button>
              <ModuleCardMd
                module={course.modules.length > 0 ? course.modules[0] : null}
                select={() => {}}
              />
              <button className={css.arrows}>
                <img src="../../../../static/assets/icon/arrow_forward_ios_24px_outlined.svg" />
              </button>
            </div>
          </div>
          {/* TODO: Add the video here
          <div className={css.introClip}>
            <ReactPlayer
              url={"https://www.youtube.com/embed/RKLKib4bHhA"}
              controls
              pip={true}
              height="100%"
              width="100%"
            />
          </div>*/}
        </div>
      </div>
    );
  }

  componentDidMount() {
    getCourse(this.state.course.id, this.courseSaveHandler);
  }
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(mapStateToProps)(DetailedCourseCard);
