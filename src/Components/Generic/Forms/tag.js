import React, { Component } from "react";
import {
  Form,
  FormControl,
  ControlLabel,
  FormGroup,
  HelpBlock,
  Schema,
  ButtonToolbar,
  Button
} from "rsuite";
import { createTag } from "../../../Requests/Tag";

import css from "./tagcat.scss";

const { StringType } = Schema.Types;

class TagForm extends Component {
  state = {
    tagForm: {
      title: "",
      wiki: ""
    }
  };

  handleChange = value => {
    this.setState({
      tagForm: value
    });
  };

  tagModel = Schema.Model({
    title: StringType().isRequired("This field is required."),
    wiki: StringType().isURL("Please enter a valid URL.")
  });

  render() {
    return (
      <div className={css.ad_pane}>
        <Form
          fluid
          ref={ref => (this.tagForm = ref)}
          model={this.tagModel}
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
          <ButtonToolbar>
            <Button
              className={css.ad_btn}
              onClick={() => {
                if (!this.tagForm.check()) {
                  return;
                }
                createTag(this.state.tagForm.title, this.state.tagForm.wiki);
                this.props.onClose();
              }}>
              Create Tag
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default TagForm;
