import React, { Component } from "react";
import css from "./course.scss";
import Form from "./form";

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
        <Form onSaveHandler={this.courseSaveHandler} />
      </div>
    );
  };

  render() {
    return (
      <div className={css.container}>
        <div className={css.page}>
          <span className={css.heading}>Create New Course</span>
          <div className={css.courseCreationPlane}>
            {this.renderCourseForm()}
            <div className={css.sidebar}>
              <button>
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseForm;
