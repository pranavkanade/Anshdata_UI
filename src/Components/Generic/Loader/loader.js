import React from "react";
import { Modal, Loader } from "rsuite";
import css from "./loader.scss";

export default props => {
  return (
    <Modal size="xs" show={true} backdrop="static" className={css.ad_loader}>
      <Loader size="lg" vertical content="Loading ..." />
      <h4>{props.msg}</h4>
    </Modal>
  );
};
