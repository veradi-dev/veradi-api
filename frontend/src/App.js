import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./screens/authenticated/Home";
import Gate from "./screens/unauthenticated/Gate";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Gate} />
    </Router>
  );
};

export default App;
