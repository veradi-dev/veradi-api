import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./authenticated/Home/Home";
import Gate from "./unauthenticated/Gate";
import Signup from "./unauthenticated/Signup";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={Gate} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};
