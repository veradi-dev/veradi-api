import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userThunks";
import QuestionRegister from "./projects/questions/QuestionRegister";

const Home = ({ history, user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isAuthenticated) {
      history.push("/auth");
    }
  }, [user]);

  return (
    <div>
      home
      <header>
        <button type="button" onClick={() => dispatch(logout())}>
          logout
        </button>
      </header>
      <Link to="/projects/questions/registration">문항 등록</Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(Home);
