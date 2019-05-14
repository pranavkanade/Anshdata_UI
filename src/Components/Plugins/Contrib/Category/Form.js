import React, { useState } from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";
import Link from "next/link";
import { createCategory } from "../../../../Requests/Category";

const catForm = props => {
  const [title, setTitle] = useState("");
  const [wiki, setWiki] = useState("");
  return (
    <Segment basic>
      <Form
        onSubmit={() => {
          createCategory(title, wiki);
          props.onClose();
        }}>
        <Header size="tiny">{"Category Title"}</Header>
        <Form.Input
          placeholder="test"
          name="title"
          size="large"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <Header size="tiny">{"Lecture Video Link (URL)"}</Header>
        <Form.Input
          placeholder="https://"
          type="url"
          value={wiki}
          name="wiki"
          onChange={event => setWiki(event.target.value)}
        />
        <Link href="/contrib/cat">
          <Form.Button floated="right" type="submit" color="teal">
            Create Category
          </Form.Button>
        </Link>
        <Button color="red" onClick={props.onClose}>
          Close
        </Button>
        <br />
      </Form>
    </Segment>
  );
};

export default catForm;
