import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ alert }) => {
  const createAlert = useAlert();
  const { type, message } = alert;
  useEffect(() => {
    if (type === "success") {
      createAlert.success(message);
    } else if (type === "info") {
      createAlert.info(message);
    } else if (type === "error") {
      createAlert.error(message);
    }
  }, [alert]);

  return <React.Fragment />;
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});
export default connect(mapStateToProps, {})(Alert);
