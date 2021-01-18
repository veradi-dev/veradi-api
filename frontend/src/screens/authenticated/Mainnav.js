import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Dashboard, NoticeLayout, Project, Room, Team, Workhour } from './';
import Noticecreate from './Notice/Noticecreate';
const MainNav = () => {
	return (
		<>
            <Switch>
                        <Route exact path="/" component={ Dashboard }/>
                        <Route exact path="/notice" component={ NoticeLayout }/>
                        <Route exact path="/noticecreate" component={ Noticecreate }/>
                        <Route exact path="/workhour" component={ Workhour }/>
                        <Route exact path="/team" component={ Team }/>
                        <Route exact path="/room" component={ Room }/>
                        <Route exact path="/project" component={ Project }/>
            </Switch>
		</>
	);
};

export default MainNav;