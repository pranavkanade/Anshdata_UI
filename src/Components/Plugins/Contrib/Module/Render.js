import React from "react";

import { Segment, Header, Statistic, Button, Icon } from "semantic-ui-react";

const moduleRender = props => {
  console.log("moduleRender: ", props.module);
  return (
    <Segment.Group raised>
      <Segment basic>
        <Header>
          <h3>{props.module.title}</h3>
        </Header>
        <span>{props.module.description}</span>
      </Segment>
      <Statistic.Group widths="three" size="mini">
        <Statistic />
        <Statistic>
          <Statistic.Value>
            <Icon name="book" /> {props.module.lessons.length}
          </Statistic.Value>
          <Statistic.Label>Lessons</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            <Icon name="pen square" /> {props.module.assignments.length}
          </Statistic.Value>
          <Statistic.Label>assignments</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <br />
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
    </Segment.Group>
  );
};

export default moduleRender;
