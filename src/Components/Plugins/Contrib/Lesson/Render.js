import React from "react";
import Assignment from "../Assignment/Render";

import { Segment, Header, Button, Icon, Embed } from "semantic-ui-react";
import css from "./render.scss";

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
    <div className={css.lesson}>
      <div className={css.lect}>
        <Embed url={props.lesson.lecture} />
      </div>
      <div>
        <text>{props.lesson.title}</text>
      </div>
      {props.type !== "detail" ? renderEditButtons(props) : null}
    </div>
  );
};

export default lessonRender;
