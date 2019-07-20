import React from "react";
import { v4 } from "uuid";
import { Notification } from "rsuite";
import { connect } from "react-redux";

function open(data) {
  const desc =
    data.data !== null ? data.data.non_field_errors : data.statusText;
  Notification[data.type]({
    title: data.type,
    duration: 6000,
    placement: "topRight",
    description: <p>{desc}</p>,
    key: data.key
  });
}

// {props.error !== null ? open({ type: "error", ...error }) : null}
const notifications = props => {
  const Errors =
    props.error !== null && props.error !== undefined
      ? open({ type: "error", key: v4(), ...props.error })
      : null;
  const Warning =
    props.warning !== null && props.warning !== undefined
      ? open({ type: "warning", key: v4(), ...props.warning })
      : null;
  const Info =
    props.info !== null && props.info !== undefined
      ? open({ type: "info", key: v4(), ...props.info })
      : null;
  const Success =
    props.success !== null && props.success !== undefined
      ? open({
          type: "success",
          key: v4(),
          ...props.success
        })
      : null;
  return (
    <React.Fragment>
      <div>{Errors}</div>
      <div>{Warning}</div>
      <div>{Info}</div>
      <div>{Success}</div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { ...state.note };
};

export default connect(mapStateToProps)(notifications);
