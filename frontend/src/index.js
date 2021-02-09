import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/index";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./components/alert/AlertTemplate";
import App from "./App";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// react-alert optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3500,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 10000
  }
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "NanumBarunGothic"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={AlertTemplate} {...options}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
