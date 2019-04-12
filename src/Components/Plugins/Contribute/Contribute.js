import React from "react";
import Link from "next/link";
import { Container, Grid, Button } from "semantic-ui-react";

const contribute = props => {
  return (
    <Container as="div" className={"ContributePlugin"}>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width="4" />
          <Grid.Column width="8">
            <Link href="/contrib/course">
              <Button color="twitter">Add New Course</Button>
            </Link>
            <Link href="/contribute">
              <Button color="teal">Add New Assignment</Button>
            </Link>
            <Link href="/contribute">
              <Button color="facebook">Review Solutions</Button>
            </Link>
          </Grid.Column>
          <Grid.Column width="4" />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default contribute;
