import React, { Component } from "react";

import { Dialog } from "evergreen-ui";
import { Form, FormGroup, ControlLabel, HelpBlock, FormControl } from "rsuite";
import { giveFeedback } from "../../../Requests/feedback";
import Loader from "../../Generic/Loader/loader";
import css from "./feedback.scss";

class Feedback extends Component {
  state = {
    formValue: {
      email: "",
      feedback: ""
    },
    shouldOpen: true,
    isLoading: false
  };

  handleChange = value => {
    this.setState({
      formValue: value
    });
  };

  submitFeedback = () => {
    giveFeedback(this.state.formValue);
    this.close();
  };

  renderFeedbackForm = () => {
    return (
      <Form
        fluid
        onChange={this.handleChange}
        formValue={this.state.formValue}>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            name="email"
            type="email"
            className={css.ad_auth_form_input}
          />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Feedback</ControlLabel>
          <FormControl name="feedback" rows={6} componentClass="textarea" />
        </FormGroup>
        <button className={css.submit} onClick={this.submitFeedback}>
          Submit
        </button>
      </Form>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <Loader msg="Thanks for submitting your feedback" />;
    }

    return (
      <Dialog
        preventBodyScrolling
        isShown={this.state.shouldOpen}
        title={"Your feedback is important to us!"}
        onCloseComplete={this.close}
        hasFooter={false}
        padding={16}>
        <div className={css.ad_auth_form_pane}>
          {this.renderFeedbackForm()}
        </div>
      </Dialog>
    );
  }

  open = () => {
    this.setState({ shouldOpen: true });
  };

  close = () => {
    this.setState({ shouldOpen: false, isLoading: false });
    this.props.shouldToggleFeedback();
  };
}

export default Feedback;
