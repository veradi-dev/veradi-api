import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Dashboard, NoticeLayout, Project, Room, Team, Workhour } from './';
import Noticecreate from './Notice/Noticecreate';
import Notice from './Notice/Notice';
import Noticedetail from './Notice/Noticedetail';
const MainNav = () => {
	return (
		<>
            <Switch>
                  <Route exact path="/" component={ Dashboard }/>
                  <Route exact path="/notice/:pageNumber" component={ Notice }/>
                  <Route exact path="/noticecreate/:team" component={ Noticecreate }/>
                  <Route exact path="/noticedetail" component={ Noticedetail }/>
                  <Route exact path="/workhour" component={ Workhour }/>
                  <Route exact path="/team" component={ Team }/>
                  <Route exact path="/room" component={ Room }/>
                  <Route exact path="/project" component={ Project }/>
            </Switch>
		</>
	);
};

export default MainNav;