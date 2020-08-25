import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkLogedIn, logout } from "../../redux/user/userThunks";
import QuestionRegister from "./projects/questions/QuestionRegister";
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
      <Route
        exact
        path="/projects/questions/registration"
        component={QuestionRegister}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = { checkLogedIn, logout };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
