import React, { useState } from "react";
import { Segment, Form } from "semantic-ui-react";
import { createCategory } from "../../../Requests/Category";

import css from "./tagcat.scss";

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
        <Form.Field>
          <span className={css.label}>Category Title</span>
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
          <span>Create Category</span>
        </Form.Button>
      </Form>
    </Segment>
  );
};

export default catForm;
