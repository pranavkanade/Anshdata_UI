import React from "react";
import { Card, Header, Segment } from "semantic-ui-react";

const renderCatList = cats => {
  return cats.map(cat => {
    return (
      <Card href={cat.wiki} key={cat.id} color="green">
        <Segment attached>
          <Header textAlign="center" size="small">
            {cat.title.toUpperCase()}
          </Header>
        </Segment>
      </Card>
    );
  });
};

const renderCats = props => {
  return <Card.Group itemsPerRow={3}>{renderCatList(props.cats)}</Card.Group>;
};

export default renderCats;
