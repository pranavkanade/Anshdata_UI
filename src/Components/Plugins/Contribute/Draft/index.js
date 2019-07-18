import React, { Component } from "react";
import Error from "../../../Generic/Error/error";
import Router from "next/router";
import css from "./index.scss";

import { getADUserInfo } from "../../../../Requests/Authorization";
import {
  getCourse,
  draftCourse,
  deleteCourse
} from "../../../../Requests/Courses";
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
    shouldOpenAddCourse: false,
    elementBeingAdded: ""
  };

  closeHandler = () => {
    this.setState({
      shouldOpenAddModule: false,
      shouldOpenAddLesson: false,
      shouldOpenAddAssignment: false,
      shouldOpenAddCourse: false,
      elementBeingAdded: ""
    });
  };

  addHandler = (
    btn,
    moduleId = null,
    lessonId = null,
    assignmentId = null
  ) => {
    console.log("[Contrib/Course.js] Add New Clicked : ", btn);
    if (btn === "course") {
      this.setState({
        shouldOpenAddCourse: true,
        elementBeingAdded: btn
      });
    }
  };

  renderAddNewForm = () => {
    const btn = this.state.elementBeingAdded;
    console.log("[Contrib/Course.js] render add new form : ", btn);
    if (this.state.shouldOpenAddCourse) {
      return (
        <CourseForm
          open={true}
          closeHandler={this.closeHandler}
          course={this.state.course}
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
    const tags = this.state.course.tagged_to;
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
        <span className={css.title}>{this.state.course.title}</span>
        <div className={css.info}>
          <div className={css.primary}>
            <div className={css.description}>
              <p>{this.state.course.description}</p>
            </div>
            <div className={css.extra}>
              {this.renderAuthorNSub(
                this.state.course.author.username,
                this.state.course.subject
              )}
              {this.renderStats(
                this.state.course.credit_points,
                this.state.course.assignments.length,
                this.getLessonsCount(this.state.course.modules)
              )}
            </div>
            <div className={css.tagBox}>{this.renderTags()}</div>
          </div>
          <div className={css.secondary}>
            {this.renderActionBar()}
            {this.state.course.is_published ? (
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
    const user = getADUserInfo();
    if (this.state.course === null) {
      return <div className={css.container}>{this.renderLoader()}</div>;
    } else if (this.state.course.author.id !== user.pk) {
      console.log("Course Author mismatch!");
      console.log("course author : ", this.state.course.author);
      console.log("logged in user : ", user);
      return <Error />;
    }
    const { course } = this.state;

    return (
      <div className={css.page}>
        <div className={css.container}>
          {this.renderCourseInfo()}
          {this.renderAddNewForm()}
        </div>
        <CourseContent course={this.state.course} />
      </div>
    );
  }

  componentDidMount() {
    // getCourse(this.state.courseId, this.courseSaveHandler);
    if (this.props.course === null) {
      this.props.fetchDetailedDraftCourse(this.state.courseId);
    } else {
      this.setState({ course: this.props.course });
    }
  }

  componentDidUpdate() {
    if (this.props.is_published !== this.state.course.is_published) {
      this.setState({ course: this.props.course });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(" Props comparison : ", nextProps, this.props);
    console.log(" State Comparison : ", nextState, this.state);
    return true;
  }
}

const mapStateToProps = state => {
  return {
    course: state.crs.draftCourse,
    is_published:
      state.crs.draftCourse !== null
        ? state.crs.draftCourse.is_published
        : false
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
