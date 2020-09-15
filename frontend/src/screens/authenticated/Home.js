import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { checkLogedIn, logout } from "../../redux/user/userThunks";
import ProjectList from "./projects/projects/ProjectList";
import ProjectDetail from "./projects/projects/ProjectDetail";
import ProjectRegistration from "./projects/projects/ProjectRegistration";
import QuestionList from "./projects/questions/QuestionList";
import QuestionRegistration from "./projects/questions/QuestionRegistration";
import MenuAppBar from "../../components/surface/AppBar";

const Home = ({ history, user, checkLogedIn, logout }) => {
  useEffect(() => {
    checkLogedIn();
  }, []);
  useEffect(() => {
    if (!user.isAuthenticated) {
      history.push("/auth");
    }
  }, [user]);

  return (
    <div>
      <MenuAppBar logout={logout} />
      <Switch>
        <Route exact path="/projects/questions" component={QuestionList} />
        <Route
          exact
          path="/projects/questions/registration"
          component={QuestionRegistration}
        />
        <Route exact path="/projects" component={ProjectList} />
        <Route
          exact
          path="/projects/registration"
          component={ProjectRegistration}
        />
        <Route exact path="/projects/:id" component={ProjectDetail} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { checkLogedIn, logout };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
