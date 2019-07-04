import React from "react";
import { Dialog } from "evergreen-ui";

export default props => {
  return (
    <Dialog
      isShown={props.open}
      title={props.title}
      width="800px"
      sideOffset="0px"
      topOffset="2rem"
      onCloseComplete={props.closeHandler}
      hasFooter={false}
      preventBodyScrolling={true}>
      {props.children}
    </Dialog>
  );
};
