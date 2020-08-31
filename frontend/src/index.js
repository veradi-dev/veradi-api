import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/index";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import Alert from "./components/alert/Alert";
import App from "./App";

// react-alert optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={Alert} {...options}>
        <App />
      </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
