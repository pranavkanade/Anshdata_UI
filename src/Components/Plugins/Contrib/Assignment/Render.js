import React from "react";

import { Segment, Header, Button, Icon, Label } from "semantic-ui-react";

// TODO: The addHandler need to be provided in contribution page
const renderEditButtons = props => {
  return (
    <Button.Group attached="bottom" size="small" widths="two">
      <Button
        basic
        color="teal"
        name="assignment"
        onClick={event => {
          props.addHandler(event.target.name, props.assignment.id);
        }}>
        Edit Assignment
      </Button>
    </Button.Group>
  );
};

const assignmentRender = props => {
  return (
    <>
      <Segment raised attached color="orange">
        <Header size="small">{props.assignment.title}</Header>
        <Label basic size="small" color="blue">
          <Icon name="pen square" />
          {props.assignment.credit_points}
          <Label.Detail>Credit Points</Label.Detail>
        </Label>
      </Segment>
      {props.type !== "detail" ? renderEditButtons(props) : null}
    </>
  );
};

export default assignmentRender;
