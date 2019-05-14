import React from "react";
import { enrollEventHandler } from "../../../Requests/Enrollment";
import { courseListType } from "../../../globals";
import { Card, Segment, Header, Label, Icon, Button } from "semantic-ui-react";

const renderEnrollButton = course => {
  return (
    <Button
      color="facebook"
      onClick={() => enrollEventHandler(course["id"])}
      attached="bottom"
      fluid
      size="large">
      Enroll
    </Button>
  );
};

const renderModifyButtons = course => {
  return (
    <Button.Group attached="bottom" size="large" widths="two">
      <Button
        basic
        color="grey"
        name="modify"
        onClick={() => {
          console.log("[Contirb.js] Modify button clicked");
        }}>
        Modify
      </Button>
      <Button
        basic
        color="red"
        name="delete"
        onClick={() => {
          console.log("[Contirb.js] Delete button clicked");
        }}>
        Delete
      </Button>
    </Button.Group>
  );
};

const renderActionButtons = (course, type) => {
  if (type === courseListType.MODIFY) {
    return renderModifyButtons(course);
  } else if (type === courseListType.LIST) {
    return renderEnrollButton(course);
  }
  return null;
};

const renderCoursesList = props => {
  return props.courses.map(course => {
    return (
      <Card
        key={course["id"]}
        raised
        href={`${props.detailURL}/${course["id"]}`}>
        <Segment basic padded>
          <Header size="large">{course.title}</Header>
          <span>{course.description}</span>
        </Segment>
        <Segment basic>
          <Label color="grey" image>
            <img src="https://react.semantic-ui.com/images/avatar/small/veronika.jpg" />
            {course.author.username}
            <Label.Detail>Author</Label.Detail>
          </Label>
          <Label color="olive">
            <Icon name="dollar" />
            {course.credit_points}
            <Label.Detail>Credit Points</Label.Detail>
          </Label>
        </Segment>
        <Segment basic>
          <Label basic color="teal" size="large">
            {course.subject}
          </Label>
          <Label basic color="violet" size="large">
            {course.category.title}
          </Label>
        </Segment>
        {renderActionButtons(course, props.courseListType)}
      </Card>
    );
  });
};

export default renderCoursesList;
