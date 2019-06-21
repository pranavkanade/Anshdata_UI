import React, { Component } from "react";
import Link from "next/link";

import css from "./DetailedCard.scss";

import { ModuleCardMd } from "./ModuleCard";
import { getCourse } from "../../../Requests/Courses";
import { enrollEventHandler } from "../../../Requests/Enrollment";
import { courseListType } from "../../../globals";

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
    if (this.props.courseListType === courseListType.ENROLLED) {
      return (
        <Link href={`/courses/attend/${courseId}`}>
          <button className={css.attend}>
            <span>Attend</span>
            <img
              src={
                "../../../../static/assets/icon/play_circle_outline_24px_outlined.svg"
              }
            />
          </button>
        </Link>
      );
    } else {
      return (
        <button
          className={css.enroll}
          onClick={() => enrollEventHandler(courseId)}>
          <span>Enroll</span>
          <img src={"../../../../static/assets/icon/add_24px_outlined.svg"} />
        </button>
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
          <Link href={`/courses/${course.id}`}>
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
          <div className={css.introClip}>
            <iframe
              src="https://www.youtube.com/embed/RKLKib4bHhA"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    getCourse(this.state.course.id, this.courseSaveHandler);
  }
}

export default DetailedCourseCard;
