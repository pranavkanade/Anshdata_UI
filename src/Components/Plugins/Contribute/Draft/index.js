import React, { Component } from "react";
import Error from "../../../Generic/Error/error";
import Loader from "../../../Generic/Loader/loader";
import Router from "next/router";
import css from "./index.scss";

import { draftCourse, deleteCourse } from "../../../../Requests/Courses";
import { publishCourse } from "../../../../Requests/DraftCourses";
import CourseForm from "../../../Generic/Forms/course";
import CourseContent from "./content";
import { connect } from "react-redux";
import {
  fetchDetailedDraftCourse,
  updateDetailedDraftCourse
} from "../../../../store/actions";

class DraftedCourse extends Component {
  state = {
    courseId: this.props.courseId,
    course: null,
    is_published: this.props.is_published,
    shouldOpenAddModule: false,
    shouldOpenAddLesson: false,
    shouldOpenAddAssignment: false,
    shouldOpenAddCourse: false
  };

  closeHandler = () => {
    this.setState({
      shouldOpenAddModule: false,
      shouldOpenAddLesson: false,
      shouldOpenAddAssignment: false,
      shouldOpenAddCourse: false
    });
  };

  addHandler = btn => {
    if (btn === "course") {
      this.setState({
        shouldOpenAddCourse: true
      });
    }
  };

  renderAddNewForm = () => {
    if (this.state.shouldOpenAddCourse) {
      return (
        <CourseForm
          open={true}
          closeHandler={this.closeHandler}
          course={this.props.course}
          edit={true}
        />
      );
    }
    return null;
  };

  courseSaveHandler = course => {
    this.setState({ course });
  };

  renderLoader = () => {
    return (
      <div className={css.page}>
        <div className={css.loader}>
          <div
            className={"ui active inverted centered inline loader massive"}
          />
        </div>
      </div>
    );
  };

  renderTags = () => {
    const tags = this.props.course.tagged_to;
    return tags.map(tag => {
      return (
        <span className={css.tag} key={tag.id}>
          {tag.title}
        </span>
      );
    });
  };

  renderActionBar = () => {
    return (
      <div className={css.actionBar}>
        <button className={css.edit} onClick={() => this.addHandler("course")}>
          <span>Edit Course Info</span>
          <img src="../../../../../static/assets/icon/create_24px_outlined.svg" />
        </button>
        <button
          className={css.delete}
          onClick={() => {
            deleteCourse(this.state.courseId);
            Router.push("/contribute");
          }}>
          <span>Delete</span>
          <img src="../../../../../static/assets/icon/delete_sweep_24px_outlined.svg" />
        </button>
      </div>
    );
  };

  renderStats = (creditPoints = 10, assignments = 2, lessons = 4) => {
    return (
      <div className={css.stats}>
        <div className={css.stat}>
          <span className={css.value}>{lessons}</span>
          <br />
          <span className={css.label}>Lessons</span>
        </div>
        <div className={css.stat}>
          <span className={css.value}>{assignments}</span>
          <br />
          <span className={css.label}>Assignments</span>
        </div>
        <div className={css.stat}>
          <span className={css.value + " " + css.credits}>{creditPoints}</span>
          <br />
          <span className={css.label}>Credit Points</span>
        </div>
      </div>
    );
  };

  renderAuthorNSub = (author = "John Doe", subject = "Test") => {
    return (
      <div className={css.infoBox}>
        <div className={css.authSub + " " + css.author}>
          <span className={css.label}>Author</span>
          <span className={css.value}>{author}</span>
        </div>
        <div className={css.authSub}>
          <div className={css.label}>Subject</div>
          <div className={css.value}>{subject}</div>
        </div>
      </div>
    );
  };

  getLessonsCount = modules => {
    return modules.reduce((sum, mod) => {
      return sum + mod.lessons.length;
    }, 0);
  };

  publishCourse = async () => {
    const resp = await publishCourse(this.state.courseId);
    this.props.updateDetailedDraftCourse(resp);
  };

  draftCourse = async () => {
    const resp = await draftCourse(this.state.courseId);
    this.props.updateDetailedDraftCourse(resp);
  };

  renderCourseInfo = () => {
    return (
      <div className={css.course}>
        <span className={css.title}>{this.props.course.title}</span>
        <div className={css.info}>
          <div className={css.primary}>
            <div className={css.description}>
              <p>{this.props.course.description}</p>
            </div>
            <div className={css.extra}>
              {this.renderAuthorNSub(
                this.props.course.author.username,
                this.props.course.subject
              )}
              {this.renderStats(
                this.props.course.credit_points,
                this.props.course.assignments.length,
                this.getLessonsCount(this.props.course.modules)
              )}
            </div>
            <div className={css.tagBox}>{this.renderTags()}</div>
          </div>
          <div className={css.secondary}>
            {this.renderActionBar()}
            {this.props.course.is_published ? (
              <div className={css.warning}>
                <p>
                  This course is not open for modification. To be able to edit
                  the course, please consider opening the course.
                </p>
                <button className={css.open_course} onClick={this.draftCourse}>
                  <span>Open for Modification</span>
                  <img src="../../../../../static/assets/icon/tune_24px_outlined.svg" />
                </button>
              </div>
            ) : (
              <div className={css.message}>
                <p>
                  You may modify the course.! And do not forget to publish once
                  you are done. 😉
                </p>
                <button className={css.publish} onClick={this.publishCourse}>
                  <span>Publish</span>
                  <img src="../../../../../static/assets/icon/upload_24px_outlined.svg" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const user = this.props.user;
    if (this.props.course === null || this.props.course === undefined) {
      return (
        <div className={css.container}>
          <Loader msg="Loading..." />
        </div>
      );
    }
    if (this.props.course.author.id !== user.pk) {
      return <Error />;
    }

    return (
      <div className={css.page}>
        <div className={css.container}>
          {this.renderCourseInfo()}
          {this.renderAddNewForm()}
        </div>
        <CourseContent course={this.props.course} />
      </div>
    );
  }

  componentDidMount() {
    // getCourse(this.state.courseId, this.courseSaveHandler);
    console.log("We are fetching : ", this.props.courseId, Router.query);
    if (
      this.props.course === undefined ||
      this.props.course === null ||
      this.props.course.id !== this.props.courseId
    ) {
      this.props.fetchDetailedDraftCourse(this.props.courseId);
    }
  }
}

const mapStateToProps = state => {
  return {
    course: state.crs.draftCourse,
    is_published:
      state.crs.draftCourse !== null && state.crs.draftCourse !== undefined
        ? state.crs.draftCourse.is_published
        : false,
    user: state.user.user
  };
};

const mapDispatchToProps = {
  fetchDetailedDraftCourse,
  updateDetailedDraftCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftedCourse);
