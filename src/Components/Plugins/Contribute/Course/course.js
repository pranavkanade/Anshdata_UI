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

  renderCategories = () => {
    return (
      <div class="menu">
        <div class="item" data-value="jenny">
          <img
            class="ui mini avatar image"
            src="/images/avatar/small/jenny.jpg"
          />
          Jenny Hess
        </div>
        <div class="item" data-value="elliot">
          <img
            class="ui mini avatar image"
            src="/images/avatar/small/elliot.jpg"
          />
          Elliot Fu
        </div>
        <div class="item" data-value="stevie">
          <img
            class="ui mini avatar image"
            src="/images/avatar/small/stevie.jpg"
          />
          Stevie Feliciano
        </div>
      </div>
    );
  };

  renderCourseForm = () => {
    return (
      <div className={css.courseForm}>
        <input
          className={css.inputTitle}
          placeholder="Course Title"
          name="courseName"
          type="text"
          value={this.state.courseName}
          onChange={event => {}}
        />
        <div className={css.halfCut}>
          <div class="ui fluid selection dropdown">
            <input type="hidden" name="user" />
            <i class="dropdown icon" />
            <div class="default text">Select Friend</div>
            {this.renderCategories()}
          </div>
          <div />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className={css.container}>
        <div className={css.page}>
          <span className={css.heading}>Create New Course</span>
          <div className={css.courseCreationPlane}>
            <div className={css.courseForm}>
              <Form onSaveHandler={this.courseSaveHandler} />
            </div>
            <div className={css.sidebar} />
          </div>
        </div>
      </div>
    );
  }
}

export default CourseForm;
