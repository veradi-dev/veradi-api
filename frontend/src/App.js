import React from "react";
import AuthRouter from "./screens/AuthRouter";
import Alert from "./components/alert/Alert";

const App = () => {
  return (
    <React.Fragment>
      <Alert />
      <AuthRouter />
    </React.Fragment>
  );
};

export default App;
