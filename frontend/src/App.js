import React from "react";
import AuthRouter from "./screens/AuthRouter";
import { useAlert } from "react-alert";
const App = () => {
  const alert = useAlert();
  return (
    <React.Fragment>
      <AuthRouter />
      <button
        onClick={() => alert.error("bbb")}
        style={{ width: 1000, height: 1000 }}
      />
    </React.Fragment>
  );
};

export default App;
