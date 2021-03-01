import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { CircularProgress, Container } from "@material-ui/core";
const Home = lazy(() => import("./authenticated/Home/Home"));
const Gate = lazy(() => import("./unauthenticated/Gate"));
const Signup = lazy(() => import("./unauthenticated/Signup"));

export default () => {
  return (
    <Suspense
      fallback={
        <Container
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress />
        </Container>
      }
    >
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
