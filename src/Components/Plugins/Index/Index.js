import React from "react";
import Link from "next/link";
import { Container, Grid, Button } from "semantic-ui-react";

const index = props => {
  return (
    <Container as="div" className={"IndexPlugin"}>
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column />
          <Grid.Column>
            <Link href="/courses">
              <Button color="instagram">Start Exploring</Button>
            </Link>
            <Link href="/contribute">
              <Button color="teal">Contribute Now</Button>
            </Link>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default index;
