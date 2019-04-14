import React, { useState } from "react";
import { Container, Grid, Form } from "semantic-ui-react";
import Router from "next/router";

const URLS = {
  CREATE_COURSE: "http://127.0.0.1:8000/api/course/"
};

const createCourse = async (courseName, courseDesc) => {
  console.log("[Course.js] Create Course clicked");
  console.log("New Course Name", courseName);
  console.log("New Course Desc", courseDesc);
  const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
    "token"
  ];
  const courseData = {
    title: courseName
  };
  const createCourseRes = await fetch(URLS.CREATE_COURSE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${AnshdataToken}`
    },
    body: JSON.stringify(courseData)
  });

  let newCourse = await createCourseRes.json();
  console.log("Newly Created Course", newCourse);
  Router.push("/courses");
};

const course = props => {
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");

  return (
    <Container as="div" className={"ContribCoursePlugin"}>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width="4" />
          <Grid.Column width="8">
            <h4>Create New Course</h4>
            <Form onSubmit={() => createCourse(courseName, courseDesc)}>
              <Form.Input
                label="Course Title"
                placeholder="Zero to 'HERO' !!"
                value={courseName}
                onChange={event => {
                  setCourseName(event.target.value);
                }}
              />
              <Form.TextArea
                label="Course Description"
                placeholder="Describe your course in short..."
                value={courseDesc}
                onChange={event => {
                  setCourseDesc(event.target.value);
                }}
              />
              <Form.Button type="submit" color="twitter">
                Create Course
              </Form.Button>
            </Form>
          </Grid.Column>
          <Grid.Column width="4" />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default course;
