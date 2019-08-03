import React from "react";
// import { Dialog } from "evergreen-ui";
import { Modal } from "rsuite";

export default props => {
  return (
    // <Dialog
    //   isShown={props.open}
    //   title={props.title}
    //   width="800px"
    //   sideOffset="0px"
    //   topOffset="2rem"
    //   onCloseComplete={props.closeHandler}
    //   hasFooter={false}
    //   preventBodyScrolling={true}>
    //   {props.children}
    // </Dialog>

    <Modal
      show={props.open}
      onHide={props.closeHandler}
      overflow={true}
      size="md">
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};
