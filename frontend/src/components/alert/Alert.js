import React from "react";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default ({ style, options, message, close }) => {
  console.log(close);
  const alertConfig = {
    style,
    severity: options.type,
    action: (
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={close}
      >
        <CloseIcon />
      </IconButton>
    ),
  };
  return <Alert {...alertConfig}>{message}</Alert>;
};
