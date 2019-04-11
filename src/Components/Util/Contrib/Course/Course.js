import React, { Component } from "react";
import StyleClasses from "./Course.scss";

class Course extends Component {
  state = {
    newTag: ""
  };

  componentDidMount() {
    console.log("[plugin/contrib/course.js] componentDidMount");
    console.log(this.state);
  }

  renderActionButtons = () => {
    return (
      <div>
        <button
          className={"btn large blue-grey lighten-1 " + StyleClasses.btnSave}>
          Save Draft
        </button>
        <button
          className={
            "btn large light-blue accent-4 " + StyleClasses.btnPublish
          }>
          Publish
        </button>
        <button
          className={"btn large lime lighten-1 " + StyleClasses.btnReview}>
          Send for review
        </button>
      </div>
    );
  };

  renderTags = () => {
    if (this.props.course.courseTags.length !== 0) {
      return this.props.course.courseTags.map((tag, idx) => {
        return (
          <div className="chip orange darken-1" key={idx}>
            {tag}
            <i className="close material-icons">close</i>
          </div>
        );
      });
    } else {
      return (
        <div className="chip orange darken-1">
          Python
          <i className="close material-icons">close</i>
        </div>
      );
    }
  };

  renderAddTag = () => {
    // TODO: This is not working properly
    return (
      <div className="row">
        <div className="col s12">{this.renderTags()}</div>
        <div className="input-field col s12">
          <textarea
            id="tags"
            type="text"
            className="materialize-textarea"
            onChange={event => {
              this.setState({ newTag: event.target.value });
            }}
          />
          <label>Tag</label>
          <button
            className="btn orange darken-1"
            onClick={() => {
              console.log("[plugin/contrib/course.js] renderAddTag");
              console.log(this.state);
              // TODO: Fix this
              // this.props.onTagAddHandler(this.state.newTag);
            }}>
            Add Tag
          </button>
        </div>
      </div>
    );
  };

  renderCourseCreationForm = () => {
    return (
      <div className={"row " + StyleClasses.CourseCreationForm}>
        <div className="col s2" />
        <form className="col s8" onSubmit={this.props.onCreateCourseHandler}>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="courseTitle"
                className="materialize-textarea"
                data-length="120"
                onChange={this.props.onChangeHandler}
                value={this.state.courseTitle}
              />
              <label>Course Title *</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="courseDescription"
                className="materialize-textarea"
                onChange={this.props.onChangeHandler}
                value={this.state.courseDescription}
              />
              <label>Describe *</label>
            </div>
          </div>
          {this.renderAddTag()}
          <button tyep="submit" className="btn green lighten-2">
            Create Course
          </button>
        </form>
        <div className="col s2" />
      </div>
    );
  };

  render() {
    return (
      <div className={StyleClasses.Hero}>
        <div className={"row"}>
          <div className="col s2" />
          <div className={"col s8"}>
            <h4 className={StyleClasses.BoxHeading}>Create New Course</h4>
            <div className={StyleClasses.Content}>
              {this.renderActionButtons()}
              {this.renderCourseCreationForm()}
            </div>
          </div>
          <div className="col s2" />
        </div>
      </div>
    );
  }
}

export default Course;
