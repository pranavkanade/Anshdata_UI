import React, { useState } from "react";
import { Container, Grid, Card } from "semantic-ui-react";

const URLS = {
  LIST_COURSE: "http://127.0.0.1:8000/api/course/"
};

const getCourseList = async setCourses => {
  console.log("[Courses.js] get courses");
  const AnshdataToken = JSON.parse(localStorage.getItem("AnshdataUser"))[
    "token"
  ];
  await fetch(URLS.LIST_COURSE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${AnshdataToken}`
    }
  })
    .then(response => response.json())
    .then(data => setCourses(data));
};

const renderCoursesList = courses => {
  return courses.map((course, idx) => {
    return (
      <Card key={idx}>
        <Card.Content
          header={course["title"]}
          meta={"Author : " + course.author.username}
        />
        <Card.Description>
          {"Enrollment Count : " + course.num_of_enrollments}
        </Card.Description>
      </Card>
    );
  });
};

const courses = props => {
  // ERROR: Rerendering in loop
  console.log("render course list");
  const [courses, setCourses] = useState([]);
  getCourseList(setCourses);

  return (
    <Container as="div" className={"CoursesPlugin"}>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width="4" />
          <Grid.Column width="8">
            <h4>Courses List</h4>
            {renderCoursesList(courses)}
          </Grid.Column>
          <Grid.Column width="4" />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default courses;
