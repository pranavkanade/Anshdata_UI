import React from "react";
import { FormGroup, ControlLabel, HelpBlock, FormControl } from "rsuite";

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? "has-error" : ""}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock style={{ color: "red" }}>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

export default CustomField;
