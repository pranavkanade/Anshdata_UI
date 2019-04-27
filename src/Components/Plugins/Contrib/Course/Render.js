import React from "react";

import { Grid, Segment, Header } from "semantic-ui-react";

const courseRender = props => {
  return (
    <>
      <Header>
        <h2>{props.course.title}</h2>
      </Header>
      <Segment basic>
        <Header>Description</Header>
        <span>{props.course.description}</span>
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
              <Header.Subheader>{props.course.category}</Header.Subheader>
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
