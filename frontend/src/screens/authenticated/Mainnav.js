import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Dashboard, Notice, Project, Room, Team, Workhour } from './';
const MainNav = () => {
	return (
		<>
            <Switch>
                        <Route exact path="/" component={ Dashboard }/>
                        <Route exact path="/notice" component={ Notice }/>
                        <Route exact path="/workhour" component={ Workhour }/>
                        <Route exact path="/team" component={ Team }/>
                        <Route exact path="/room" component={ Room }/>
                        <Route exact path="/project" component={ Project }/>
            </Switch>
		</>
	);
};

export default MainNav;