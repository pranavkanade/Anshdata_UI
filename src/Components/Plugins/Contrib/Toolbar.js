import React from "react";
import {
  Segment,
  Button,
  Header,
  Container,
  Divider
} from "semantic-ui-react";

const renderBtn = props => {
  const options = ["Module", "Lesson", "Assignment"];
  return options.map((opt, idx) => {
    if (props.courseId === undefined) {
      return (
        <div key={idx}>
          <Button
            fluid
            name={opt.toLowerCase()}
            disabled
            onClick={event => {
              props.addHandler(event.target.name);
            }}>
            Add {opt}
          </Button>
          <Divider hidden />
        </div>
      );
    }
    return (
      <div key={idx}>
        <Button
          fluid
          name={opt.toLowerCase()}
          onClick={event => {
            props.addHandler(event.target.name);
          }}>
          Add {opt}
        </Button>
        <Divider hidden />
      </div>
    );
  });
};

const toolbar = props => {
  return (
    <div>
      <Header>Toolbar</Header>
      {renderBtn(props)}
    </div>
  );
};

export default toolbar;
