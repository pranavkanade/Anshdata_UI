import React, { Component } from "react";
import css from "./index.scss";

import { getCourse } from "../../../../Requests/Courses";
import CourseForm from "../../../Generic/Forms/course";
import CourseContent from "./content";

class DraftedCourse extends Component {
  state = {
    courseId: this.props.courseId,
    course: null,
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

  renderActionBar = () => {
    return (
      <div className={css.actionBar}>
        <button className={css.edit} onClick={() => this.addHandler("course")}>
          <span>Edit Course Info</span>
          <img src="../../../../../static/assets/icon/create_24px_outlined.svg" />
        </button>
        <button className={css.review}>
          <span>Send for Review</span>
          <img src="../../../../../static/assets/icon/done_all_24px_outlined.svg" />
        </button>
        <button className={css.publish}>
          <span>Publish</span>
          <img src="../../../../../static/assets/icon/upload_24px_outlined.svg" />
        </button>
        <button className={css.delete}>
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

  renderCourseInfo = () => {
    return (
      <div className={css.course}>
        <span className={css.title}>{this.state.course.title}</span>
        <div className={css.info}>
          <div className={css.primary}>
            <div className={css.description}>
              <p>{this.state.course.description}</p>
            </div>
            <div className={css.tagBox} />
            {this.renderActionBar()}
          </div>
          <div className={css.secondary}>
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
            <div className={css.optionsBox}>
              <button className={css.save}>
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.course === null) {
      return <div className={css.container}>{this.renderLoader()}</div>;
    }
    const { course } = this.state;

    return (
      <div className={css.container}>
        <div className={css.page}>
          {this.renderCourseInfo()}
          {this.renderAddNewForm()}
          <CourseContent modules={this.state.course.modules} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    getCourse(this.state.courseId, this.courseSaveHandler);
  }
}

export default DraftedCourse;
