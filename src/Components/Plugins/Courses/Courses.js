import React, { Component } from "react";
import StyleClasses from "./Courses.scss";

const URLS = {
  COURSE_LIST: "http://127.0.0.1:8000/api/course/"
};

class Courses extends Component {
  state = {
    courseList: []
  }
  
  enrollToCourse = (courseId) => {
    console.log("[enroll to course]: ", courseId);
    const URL_COURSE_ENROLL = `http://127.0.0.1:8000/api/course/${courseId}/enroll/`
    const AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
    const AnshdataToken = AnshdataUser["token"]
    fetch(URL_COURSE_ENROLL, {
      method: "PATCH",
      headers: {
        "Authorization": `JWT ${AnshdataToken}`
      }
    })
  }
  
  renderCoursesList = () => {
    return (
      <div>
        {this.state.courseList.map(course => {
          return (
            <div>
              <div>
              id: {course.id}<br/>
              title: {course.title}<br/>
              enrollment count: {course.num_of_enrollments}<br/>
              </div>
              <button onClick={this.enrollToCourse(course.id)}>Enroll</button>
              <br/>
              <br/>
            </div>
          )
        })}
      </div>
    )
  }
  
  componentDidMount() {
    const AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
    const AnshdataToken = AnshdataUser["token"]
    fetch(URLS.COURSE_LIST, {
      method: "GET",
      headers: {
        "Authorization": `JWT ${AnshdataToken}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({courseList: data}));
  }
  
  render = () => {
    return (
      <>
        <div className={StyleClasses.Hero}>
          <h3>Heading from Courses Plugin</h3>
          {this.renderCoursesList()}
        </div>
      </>
    );
  };
}
export default Courses;
