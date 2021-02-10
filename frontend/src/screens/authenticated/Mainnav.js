import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Dashboard, NoticeLayout, Project, Room, Team, Workhour } from "./";
import Noticecreate from "./Notice/Noticecreate";
import Notice from "./Notice/Notice";
import Noticedetail from "./Notice/Noticedetail";
import CancelRoom from "./Room/CancelRoom";
import Error from "../authenticated/Error/Error";

const MainNav = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route
          exact
          path="/notice/:team/noticelist/:pageNumber"
          component={Notice}
        />
        <Route exact path="/notice/:team/create" component={Noticecreate} />
        <Route exact path="/notice/:team/:num" component={Noticedetail} />
        <Route exact path="/workhour" component={Workhour} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/cancelroom" component={CancelRoom} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/error" component={Error} />
        <Redirect path="*" to="/error" />
      </Switch>
    </>
  );
};

export default MainNav;
