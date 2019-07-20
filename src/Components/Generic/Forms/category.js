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
import { createCategory } from "../../../Requests/Category";

import css from "./tagcat.scss";

const { StringType } = Schema.Types;

class CategoryForm extends Component {
  state = {
    catForm: {
      title: "",
      wiki: ""
    }
  };

  catModel = Schema.Model({
    title: StringType().isRequired("This field is required."),
    wiki: StringType().isURL("Please enter a valid URL.")
  });

  handleChange = value => {
    this.setState({
      catForm: value
    });
  };

  render() {
    return (
      <div className={css.ad_pane}>
        <Form
          fluid
          ref={ref => (this.catForm = ref)}
          model={this.catModel}
          onChange={this.handleChange}
          formValue={this.state.catForm}>
          <FormGroup>
            <ControlLabel>Category Title</ControlLabel>
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
                if (!this.catForm.check()) {
                  return;
                }
                createCategory(
                  this.state.catForm.title,
                  this.state.catForm.wiki
                );
                this.props.onClose();
              }}>
              Create Category
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
