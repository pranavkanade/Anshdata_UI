import React, { Component } from "react";
import { Modal, Button, Container, Grid, Divider } from "semantic-ui-react";
import CatForm from "./Form";
import Categories from "./Render";
import { getCategoryList } from "../../../../Requests/Category";

class Category extends Component {
  state = {
    shouldOpenForm: false,
    cats: []
  };

  onCatsSaveHandler = cats => {
    this.setState({ cats });
  };

  closeHandler = () => {
    this.setState({
      shouldOpenForm: false
    });
  };

  renderCatAddForm = () => {
    return (
      <Modal
        open={this.state.shouldOpenForm}
        size="small"
        onClose={this.closeHandler}
        closeOnDimmerClick={false}
        closeOnEscape={false}>
        <Modal.Header>Create New Category</Modal.Header>
        <Modal.Content>
          <CatForm onClose={this.closeHandler} />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    return (
      <Container>
        <br />
        <br />
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width="1" />
            <Grid.Column width="13">
              <Button
                floated="right"
                onClick={() => {
                  this.setState({ shouldOpenForm: true });
                }}>
                Add New Category
              </Button>
              {this.renderCatAddForm()}
            </Grid.Column>
            <Grid.Column width="2" />
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width="1" />
            <Grid.Column width="14">
              <br />
              <br />
              <Categories cats={this.state.cats} />
            </Grid.Column>
            <Grid.Column width="1" />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    getCategoryList(this.onCatsSaveHandler);
  }
}

export default Category;
