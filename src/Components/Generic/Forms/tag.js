import React, { useState } from "react";
import { Segment, Form } from "semantic-ui-react";
import { createTag } from "../../../Requests/Tag";

import css from "./tagcat.scss";

const tagForm = props => {
  const [title, setTitle] = useState("");
  const [wiki, setWiki] = useState("");
  return (
    <Segment basic>
      <Form
        onSubmit={() => {
          createTag(title, wiki);
          props.onClose();
        }}>
        <Form.Field>
          <span className={css.label}>Tag Title</span>
          <input
            placeholder="test"
            name="title"
            type="text"
            value={title}
            className={css.inp}
            onChange={event => setTitle(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <span className={css.label}>Wiki Link (URL)</span>
          <input
            placeholder="https://"
            name="wiki"
            type="url"
            value={wiki}
            className={css.inp}
            onChange={event => setWiki(event.target.value)}
          />
        </Form.Field>
        <Form.Button
          floated="right"
          type="submit"
          color="teal"
          className={css.btn}>
          <span>Create Tag</span>
        </Form.Button>
      </Form>
    </Segment>
  );
};

export default tagForm;
