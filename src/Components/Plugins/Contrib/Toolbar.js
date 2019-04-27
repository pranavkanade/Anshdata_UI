import React from "react";
import {
  Segment,
  Button,
  Header,
  Container,
  Divider
} from "semantic-ui-react";

const toolbar = props => {
  return (
    <div>
      <Header>Toolbar</Header>
      <Button
        fluid
        name="module"
        onClick={event => {
          props.addHandler(event.target.name);
        }}>
        Add Module
      </Button>
      <Divider hidden />
      <Button
        fluid
        name="lesson"
        onClick={event => {
          props.addHandler(event.target.name);
        }}>
        Add Lesson
      </Button>
      <Divider hidden />
      <Button
        fluid
        name="assignment"
        onClick={event => {
          props.addHandler(event.target.name);
        }}>
        Add Assignment
      </Button>
    </div>
  );
};

export default toolbar;
