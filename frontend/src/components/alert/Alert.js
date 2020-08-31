import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ type, message }) => {
  const alert = useAlert();
  if (type === "success") {
    alert.success(message);
  } else if (type === "info") {
    alert.info(message);
  } else if (type === "error") {
    alert.error(message);
  }
  return <React.Fragment />;
};

const mapStateToProps = (state) => ({
  type: state.alert.type,
  message: state.alert.message,
});
export default connect(mapStateToProps, {})(Alert);
