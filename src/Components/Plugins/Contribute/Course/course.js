import React, { Component } from "react";
import css from "./course.scss";
import Form from "../../../Generic/Forms/course";
import Auth from "../../../Generic/Auth/Auth";

class CourseForm extends Component {
  state = {
    courseId: 0,
    askToJoin: false
  };

  closeAuthForm = () => {
    this.setState({ askToJoin: false });
  };

  askUserToJoin = () => {
    this.setState({ askToJoin: true });
  };

  courseSaveHandler = course => {
    this.setState({
      courseId: course.id
    });
  };

  renderCourseForm = () => {
    return (
      <div className={css.courseForm}>
        <Form
          onSaveHandler={this.courseSaveHandler}
          askToJoin={this.askUserToJoin}
          closeHandler={() => {}}
        />
      </div>
    );
  };

  render() {
    return (
      <div className={css.container}>
        {this.state.askToJoin ? (
          <Auth hideAuthFormHandler={this.closeAuthForm} authOption="signup" />
        ) : null}
        <div />
        <div className={css.page}>
          <span className={css.heading}>Create New Course</span>
          <div className={css.courseCreationPlane}>
            {this.renderCourseForm()}
            <div />
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default CourseForm;
