import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./authenticated/Home";
import Gate from "./unauthenticated/Gate";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={Gate} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};
