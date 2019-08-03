import React, { Component } from "react";
import { getUserDetails } from "../../../Requests/User";
import css from "./index.scss";

class Index extends Component {
  state = {
    user: null
  };

  userSaveHandler = user => {
    this.setState({ user });
  };

  render() {
    if (this.state.user === null || this.state.user === undefined) {
      return null;
    }
    return (
      <div className={css.container}>
        <img
          src="../../../../static/assets/imgs/in_progress.svg"
          alt="in progress"
        />
        <div>
          <span>Hi there "{this.state.user.username}" !</span>
          <p>Sorry but, we are still building this for you. 🖖</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    getUserDetails(this.props.user_name, this.userSaveHandler);
  }
}

export default Index;
