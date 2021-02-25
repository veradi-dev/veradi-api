import { CircularProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
const Home = lazy(() => import("./authenticated/Home/Home"));
const Gate = lazy(() => import("./unauthenticated/Gate"));
const Signup = lazy(() => import("./unauthenticated/Signup"));

export default () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Switch>
          <Route exact path='/auth' component={Gate} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </Suspense>
  );
};
