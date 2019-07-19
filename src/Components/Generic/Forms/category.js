import React, { Component } from "react";
import { Form, FormControl, ControlLabel, FormGroup, HelpBlock } from "rsuite";
import { createCategory } from "../../../Requests/Category";

import css from "./tagcat.scss";

class CategoryForm extends Component {
  state = {
    catForm: {
      title: "",
      wiki: ""
    }
  };

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

          <button
            className={css.ad_btn}
            onClick={() => {
              createCategory(
                this.state.catForm.title,
                this.state.catForm.wiki
              );
              this.props.onClose();
            }}>
            Create Category
          </button>
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
