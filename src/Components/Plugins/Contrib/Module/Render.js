import React from "react";

import { Segment, Header, Button, Icon, Label } from "semantic-ui-react";
import css from "./render.scss";

const renderEditButtons = props => {
  return (
    <Button.Group attached="bottom" size="large" widths="three">
      <Button
        basic
        color="teal"
        name="module"
        onClick={event => {
          props.addHandler(event.target.name, props.module.id, null);
        }}>
        Edit Module
      </Button>
      <Button
        basic
        color="orange"
        name="lesson"
        onClick={event => {
          props.addHandler(event.target.name, props.module.id, null);
        }}>
        Add Lesson
      </Button>
      <Button
        basic
        color="violet"
        name="assignment"
        onClick={event => {
          props.addHandler(event.target.name, props.module.id, null);
        }}>
        Add Assignment
      </Button>
    </Button.Group>
  );
};

const moduleRender = props => {
  // console.log("moduleRender: ", props.module);
  return (
    <div className={css.module}>
      <div className={css.heading}>
        <text>{props.module.title}</text>
      </div>
      <div className={css.clsBox}>
        <text>Lessons</text>
        <text>{props.module.lessons.length}</text>
      </div>
      <div className={css.assignBox}>
        <text>Assignments</text>
        <text>{props.module.assignments.length}</text>
      </div>
      {/* NOTE: if this is 'detail' that means a user is viewing the course in detail
        TODO: Edit following with assignment creation
    */}
      {props.type !== "detail" ? renderEditButtons(props) : null}
    </div>
  );
};

export default moduleRender;
