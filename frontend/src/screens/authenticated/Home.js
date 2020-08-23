import React, { useEffect } from "react";
import { useHistory, Route, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userThunks";
import QuestionRegister from "./projects/questions/QuestionRegister";

const Home = ({ match, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isAuthenticated) {
      history.push("/auth");
    }
  }, [user]);

  return (
    <div>
      home
      <button type="button" onClick={() => dispatch(logout())}>
        logout
      </button>
      <Route
        path={`${match.path}projects/questions/registration`}
        component={QuestionRegister}
      />
      <Link to={`${match.path}projects/questions/registration`}>문항 등록</Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(Home);
