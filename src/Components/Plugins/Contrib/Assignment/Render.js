import React from "react";

import {
  Segment,
  Header,
  Button,
  Icon,
  Label,
  Divider
} from "semantic-ui-react";

import css from "./render.scss";

// TODO: The addHandler need to be provided in contribution page
const renderEditButtons = props => {
  return (
    <Button.Group attached="bottom" size="small" widths="two">
      <Button
        basic
        color="teal"
        name="assignment"
        onClick={event => {
          props.addHandler(
            event.target.name,
            props.assignment.module,
            props.assignment.lesson,
            props.assignment.id
          );
        }}>
        Edit Assignment
      </Button>
    </Button.Group>
  );
};

const assignmentRender = props => {
  return (
    <>
      <div className={css.assignment}>
        <span className={css.heading}>{props.assignment.title}</span>
        <Divider hidden />
        <div className={css.credits}>
          <text>Credit Points</text>
          <text>{props.assignment.credit_points}</text>
        </div>
      </div>
      {props.type !== "detail" ? renderEditButtons(props) : null}
    </>
  );
};

export default assignmentRender;
