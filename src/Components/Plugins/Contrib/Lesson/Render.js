import React from "react";
import Assignment from "../Assignment/Render";

import { Segment, Header, Button, Icon, Label } from "semantic-ui-react";

// TODO: The addHandler need to be provided in contribution page
const renderEditButtons = props => {
  return (
    <Button.Group attached="bottom" size="small" widths="two">
      <Button
        basic
        color="teal"
        name="lesson"
        onClick={event => {
          props.addHandler(
            event.target.name,
            props.lesson.module,
            props.lesson.id
          );
        }}>
        Edit Lesson
      </Button>
      <Button
        basic
        color="violet"
        name="assignment"
        onClick={event => {
          props.addHandler(
            event.target.name,
            props.lesson.module,
            props.lesson.id
          );
        }}>
        Add Assignment
      </Button>
    </Button.Group>
  );
};

const lessonRender = props => {
  return (
    <>
      <br />
      <Segment attached raised>
        <Header size="small">{props.lesson.title}</Header>
        <Label basic size="small" color="blue">
          <Icon name="pen square" />
          {props.lesson.assignments.length}
          <Label.Detail>Assignments</Label.Detail>
        </Label>
      </Segment>
      {props.type !== "detail" ? renderEditButtons(props) : null}
    </>
  );
};

export default lessonRender;
