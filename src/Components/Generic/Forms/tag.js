import React, { Component } from "react";
import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from "rsuite";
import { createTag } from "../../../Requests/Tag";

import css from "./tagcat.scss";

class TagForm extends Component {
  state = {
    tagForm: {
      title: "",
      wiki: ""
    }
  };

  handleChange = value => {
    console.log("handle change : ", value);
    this.setState({
      tagForm: value
    });
  };

  render() {
    return (
      <div className={css.ad_pane}>
        <Form
          fluid
          onChange={this.handleChange}
          formValue={this.state.tagForm}>
          <FormGroup>
            <ControlLabel>Tag Title</ControlLabel>
            <FormControl
              name="title"
              placeholder="test"
              className={css.ad_inp}
            />
            <HelpBlock>Required</HelpBlock>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Wiki Link (URL)</ControlLabel>
            <FormControl
              placeholder="https://"
              type="url"
              name="wiki"
              className={css.ad_inp}
            />
          </FormGroup>

          <button
            className={css.ad_btn}
            onClick={() => {
              createTag(this.state.tagForm.title, this.state.tagForm.wiki);
              this.props.onClose();
            }}>
            Create Tag
          </button>
        </Form>
      </div>
    );
  }
}

export default TagForm;
