import React from "react";

import { Segment, Header, Button, Icon, Label } from "semantic-ui-react";

const renderEditButtons = props => {
  return (
    <Button.Group attached="bottom" size="big" widths="three">
      <Button
        basic
        color="teal"
        name="module"
        onClick={event => {
          props.addHandler(event.target.name, props.module.id);
        }}>
        Edit Module
      </Button>
      <Button
        basic
        color="orange"
        name="lesson"
        onClick={event => {
          props.addHandler(event.target.name, props.module.id);
        }}>
        Add Lesson
      </Button>
      <Button
        basic
        color="violet"
        name="assignment"
        onClick={event => {
          props.addHandler(event.target.name, props.module.id);
        }}>
        Add Assignment
      </Button>
    </Button.Group>
  );
};

const moduleRender = props => {
  // console.log("moduleRender: ", props.module);
  return (
    <Segment.Group raised>
      <Segment basic>
        <Header>{props.module.title}</Header>
        <span>{props.module.description}</span>
      </Segment>
      <Segment basic>
        <Label basic size="large" color="violet">
          <Icon name="book" />
          {props.module.lessons.length}
          <Label.Detail>Lessons</Label.Detail>
        </Label>
        <Label basic size="large" color="brown">
          <Icon name="pen square" />
          {props.module.assignments.length}
          <Label.Detail>Assignments</Label.Detail>
        </Label>
        <Button icon basic floated="right">
          {props.isExpanded ? <Icon name="minus" /> : <Icon name="add" />}
        </Button>
      </Segment>
      <br />
      {/* NOTE: if this is 'detail' that means a user is viewing the course in detail */}
      {props.type !== "detail" ? renderEditButtons(props) : null}
    </Segment.Group>
  );
};

export default moduleRender;
