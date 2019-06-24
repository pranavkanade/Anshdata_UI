import React, { Component } from "react";
import css from "./index.scss";

import { getCourse } from "../../../../Requests/Courses";

class DraftedCourse extends Component {
  state = {
    courseId: this.props.courseId,
    course: null
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

  render() {
    if (this.state.course === null) {
      return <div className={css.container}>{this.renderLoader()}</div>;
    }
    const { course } = this.state;

    return (
      <div>
        <div>
          <span className={css.title}>{course.title}</span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    getCourse(this.state.courseId, this.courseSaveHandler);
  }
}

export default DraftedCourse;
