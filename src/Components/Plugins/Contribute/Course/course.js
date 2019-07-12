import React, { Component } from "react";
import css from "./course.scss";
import Form from "../../../Generic/Forms/course";

class CourseForm extends Component {
  state = {
    courseId: 0
  };

  courseSaveHandler = course => {
    console.log("[Contrib/Course.js] Course has been saved");
    this.setState({
      courseId: course.id
    });
  };

  renderCourseForm = () => {
    return (
      <div className={css.courseForm}>
        <Form onSaveHandler={this.courseSaveHandler} closeHandler={() => {}} />
      </div>
    );
  };

  render() {
    return (
      <div className={css.container}>
        <div className={css.page}>
          <h1 className={css.heading}>Create New Course</h1>
          <div className={css.courseCreationPlane}>
            {this.renderCourseForm()}
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default CourseForm;
