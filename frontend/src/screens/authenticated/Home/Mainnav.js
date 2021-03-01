import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Room = lazy(() => import("../Room/Room"));
const Team = lazy(() => import("../Team/Team"));
const Workhour = lazy(() => import("../Workhour/Workhour"));
const Notice = lazy(() => import("../Notice/Notice"));
const Error = lazy(() => import("../Error/Error"));
const NoticeCreate = lazy(() => import("../Notice/NoticeCreate"));
const NoticeDerail = lazy(() => import("../Notice/NoticeDetail"));

const MainNav = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/notice/:team/:page' component={Notice} />
        <Route exact path='/notice/create' component={NoticeCreate} />
        <Route exact path='/notice/:page/:id' component={NoticeDetail} />
        <Route exact path='/workhour' component={Workhour} />
        <Route exact path='/team' component={Team} />
        <Route exact path='/room' component={Room} />
        <Route exact path='/error' component={Error} />
        <Redirect path='*' to='/error' />
      </Switch>
    </Suspense>
  );
};

export default MainNav;
