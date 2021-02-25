import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Dashboard, Project, Room, Team, Workhour } from "..";
import NoticeCreate from "../Notice/NoticeCreate";
import Notice from "../Notice/Notice";
import NoticeDetail from "../Notice/NoticeDetail";
import CancelRoom from "../Room/CancelRoom";
import Error from "../Error/Error";

const MainNav = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/notice/:team/:page' component={Notice} />
        <Route exact path='/notice/create' component={NoticeCreate} />
        <Route exact path='/notice/:page/:id' component={NoticeDetail} />
        <Route exact path='/workhour' component={Workhour} />
        <Route exact path='/team' component={Team} />
        <Route exact path='/room' component={Room} />
        <Route exact path='/cancelroom' component={CancelRoom} />
        <Route exact path='/project' component={Project} />
        <Route exact path='/error' component={Error} />
        <Redirect path='*' to='/error' />
      </Switch>
    </>
  );
};

export default MainNav;
