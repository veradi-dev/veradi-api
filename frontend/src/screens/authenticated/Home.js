import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ user }) => {
  const history = useHistory();

  if (!user.isAuthenticated) {
    history.push("/auth");
  }
  return <div>home</div>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(Home);
