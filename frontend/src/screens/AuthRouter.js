import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./authenticated/Home";
import Gate from "./unauthenticated/Gate";

export default () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Gate} />
    </Router>
  );
};
