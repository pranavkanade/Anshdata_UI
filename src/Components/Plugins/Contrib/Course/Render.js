import React from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Icon,
  Divider
} from "semantic-ui-react";
import enrollEventHandler from "../../../../Requests/Enroll";

const renderButtons = props => {
  console.log("render course type", props.type);
  if (props.type !== "detail") {
    return (
      <>
        <Grid.Column width="4">
          <Button
            fluid
            basic
            size="large"
            color="red"
            name="course"
            onClick={event => props.addHandler(event.target.name)}>
            <Icon name="pencil" />
            Edit Course
          </Button>
        </Grid.Column>
      </>
    );
  }
  return (
    <>
      <Grid.Column width="3">
        <Button
          size="big"
          color="twitter"
          fluid
          onClick={() => enrollEventHandler(props.course.id)}>
          Enroll
        </Button>
      </Grid.Column>
      <Grid.Column width="1" />
    </>
  );
};

const courseRender = props => {
  return (
    <>
      <Segment basic>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column width="1" />
            <Grid.Column width="11">
              <Header>
                <h2>{props.course.title}</h2>
              </Header>
              <Header>Description</Header>
              <span>{props.course.description}</span>
            </Grid.Column>
            {renderButtons(props)}
          </Grid.Row>
        </Grid>
      </Segment>
      <Grid textAlign="center">
        <Grid.Row columns={5}>
          <Grid.Column>
            <Segment color="blue" attached>
              <Header>Credit Points</Header>
              <Header.Subheader>{props.course.credit_points}</Header.Subheader>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="violet" attached>
              <Header>Category</Header>
              <Header.Subheader>
                {props.course.category.title}
              </Header.Subheader>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="teal" attached>
              <Header>Subject</Header>
              <Header.Subheader>{props.course.subject}</Header.Subheader>
            </Segment>
          </Grid.Column>
          <Grid.Column />
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </>
  );
};

export default courseRender;
