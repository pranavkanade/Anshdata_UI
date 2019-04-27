import React, { Component } from "react";
import {
  Modal,
  Button,
  Segment,
  Header,
  Form,
  Divider,
  Grid
} from "semantic-ui-react";

import createModuleHandler from "./Action";

class ModuleForm extends Component {
  state = {
    shouldOpen: false,
    title: "",
    description: "",
    references: ""
  };

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("[Module/Form.js] onChangeHandler");
    console.log(name, value);
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  createModule = () => {
    console.log("[Module/Form.js] Create Module clicked");
    const moduleData = {
      title: this.state.title,
      descriptoin: this.state.description,
      references: this.state.references,
      course: this.props.course.id
    };
    createModuleHandler(moduleData);
    this.props.closeHandler();
  };

  render() {
    const open = this.state.shouldOpen;
    return (
      <Modal
        open={open}
        onClose={this.props.closeHandler}
        closeOnDimmerClick={false}
        closeOnEscape={false}
        centered={false}>
        <Modal.Header>
          Add New Module
          <Button onClick={this.props.closeHandler} negative floated="right">
            close
          </Button>
        </Modal.Header>
        <Modal.Content>
          <Segment basic>
            <Header>{this.props.course.title}</Header>
            <Form onSubmit={this.createModule}>
              <Header size="tiny">Module Title</Header>
              <Form.Input
                placeholder="Introduction"
                value={this.state.title}
                name="title"
                size="large"
                onChange={event => this.changeHandler(event)}
              />
              <Header size="tiny">Module Description</Header>
              <Form.TextArea
                placeholder="Describe purpose of this module in short..."
                value={this.state.description}
                name="description"
                onChange={event => this.changeHandler(event)}
              />
              <Header size="tiny">{"References (Help)"}</Header>
              <Form.TextArea
                placeholder="Add references .."
                value={this.state.references}
                name="references"
                onChange={event => this.changeHandler(event)}
              />
              <Divider hidden />
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column />
                  <Grid.Column>
                    <Form.Button
                      type="submit"
                      color="twitter"
                      fluid
                      size="big">
                      Save
                    </Form.Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }

  componentDidMount() {
    console.log("[Contrib/Module/Form.js] component did mount");
    this.setState({ shouldOpen: this.props.open });
  }
}

export default ModuleForm;
