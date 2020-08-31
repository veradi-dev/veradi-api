import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkLogedIn, logout } from "../../redux/user/userThunks";
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
      <Route exact path="/projects/questions" component={QuestionList} />
      <Route
        exact
        path="/projects/questions/registration"
        component={QuestionRegistration}
      />
      <Route
        exact
        path="/projects/registration"
        component={ProjectRegistration}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { checkLogedIn, logout };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
