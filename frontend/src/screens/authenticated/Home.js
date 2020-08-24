import React, { useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userThunks";
import QuestionRegister from "./projects/questions/QuestionRegister";

import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  toobar: {
    flexGrow: 1,
    flexDirection: "row-reverse",
  },
}));

function MenuAppBar({ logout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toobar}>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>내 계정 관리</MenuItem>
              <MenuItem onClick={logout}>로그아웃</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Home = ({ history, user, logout }) => {
  useEffect(() => {
    if (!user.isAuthenticated) {
      history.push("/auth");
    }
  }, [user]);

  return (
    <div>
      <MenuAppBar logout={logout} />

      <Link to="/projects/questions/registration">문항 등록</Link>
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
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
