import React, { Component } from "react";
import AddCourse from "../Components/Util/Contrib/Course/Course";

const URLS = {
  COURSE_CREATE: "http://127.0.0.1:8000/api/course/"
};

class Contribution extends Component {
  state = {
    courseTitle: "",
    courseDescription: "",
    courseTags: [],
    courseModules: []
  };

  componentDidMount() {
    console.log("[Contribute.js] componentDidMount");
    console.log(this.state);

    console.log("Check new course", localStorage.getItem("CreatedCourse"));
  }

  createCourseHandler = async () => {
    console.log("[Contribute.js] createCourseHandler");
    console.log(this.state);
    const coursePayload = {
      title: this.state.courseTitle
    };
    const AnshdataUser = JSON.parse(localStorage.getItem("AnshdataUser"));
    const AnshdataToken = AnshdataUser["token"]
    const createCourse = await fetch(URLS.COURSE_CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${AnshdataToken}`
      },
      body: JSON.stringify(coursePayload)
    });
    const res = JSON.stringify(await createCourse.json());
    localStorage.setItem(
      "CreatedCourse",
      res
    );
    console.log("[Contribute.js] createCourseHandler");
    console.log(this.state);
    console.log("Created Course", res);
  };

  onTagAddHandler = tag => {
    console.log("[Contribute.js] onTagAddHandler");
    let tags = [...this.state.courseTags];
    tags.push(tag);
    console.log("tags : ", tags);
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState["courseTags"] = tags;
      console.log("newState", newState);
      return newState;
    });
    console.log("[Contribute.js] onTagAddHandler from outside");
    console.log(this.state);
  };

  onChangeHandler = event => {
    const name = event.target.id;
    const value = event.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div>
        <AddCourse
          course={this.state}
          onChangeHandler={this.onChangeHandler}
          onTagAddHandler={this.onTagAddHandler}
          onCreateCourseHandler={this.createCourseHandler}
        />
      </div>
    );
  }
}

export default Contribution;
