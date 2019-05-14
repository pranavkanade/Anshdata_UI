import React from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Icon,
  Divider
} from "semantic-ui-react";
import Link from "next/link";
import { enrollEventHandler } from "../../../../Requests/Enrollment";
import createCourseHandler from "./Action";

const renderButtons = props => {
  console.log("render course type", props.type);
  if (props.type !== "detail") {
    return (
      <>
        <Grid.Column width="4">
          <Button
            fluid
            basic
            size="big"
            color="red"
            name="course"
            onClick={event => props.addHandler(event.target.name)}>
            <Icon name="pencil" size="small" /> Edit Course
          </Button>
          <Divider hidden />
          <Link href={`/courses/${props.course.id}`}>
            <Button
              fluid
              basic
              size="big"
              color="green"
              name="publish"
              onClick={() => {
                const data = {
                  is_published: true
                };
                createCourseHandler(data, props.course.id);
              }}>
              <Icon name="paper plane outline" size="small" />
              Publish Course
            </Button>
          </Link>
        </Grid.Column>
      </>
    );
  } else if (props.isEnrolled) {
    return (
      <>
        <Grid.Column width="3">
          <Link href={`/courses/attend/${props.course.id}`}>
            <Button size="big" color="purple" fluid>
              Attend
            </Button>
          </Link>
        </Grid.Column>
        <Grid.Column width="1" />
      </>
    );
  }
  return (
    <>
      <Grid.Column width="3">
        <Link href={`/courses/${props.course.id}`}>
          <Button
            size="big"
            color="twitter"
            fluid
            onClick={() => enrollEventHandler(props.course.id)}>
            Enroll
          </Button>
        </Link>
      </Grid.Column>
      <Grid.Column width="1" />
    </>
  );
};

const courseRender = props => {
  return (
    <>
      <Segment basic>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column width="1" />
            <Grid.Column width="11">
              <Header>
                <h2>{props.course.title}</h2>
              </Header>
              <Header>Description</Header>
              <span>{props.course.description}</span>
            </Grid.Column>
            {renderButtons(props)}
          </Grid.Row>
        </Grid>
      </Segment>
      <Grid textAlign="center">
        <Grid.Row columns={5}>
          <Grid.Column>
            <Segment color="blue" attached>
              <Header>Credit Points</Header>
              <Header.Subheader>{props.course.credit_points}</Header.Subheader>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="violet" attached>
              <Header>Category</Header>
              <Header.Subheader>
                {props.course.category.title}
              </Header.Subheader>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="teal" attached>
              <Header>Subject</Header>
              <Header.Subheader>{props.course.subject}</Header.Subheader>
            </Segment>
          </Grid.Column>
          <Grid.Column />
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </>
  );
};

export default courseRender;
