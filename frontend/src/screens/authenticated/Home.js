import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userThunks";

const Home = ({ user }) => {
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(Home);
