import React, { lazy, useState, useEffect } from "react";

import { connect } from "react-redux";
import { checkLogedIn, logout } from "../../../redux/user/userThunks";
import { useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import useStyles from "./styles";
import Drawer from "./Drawer";
import LogoImage from "../../../../assets/veradi/logo.png";
import clsx from "clsx";
import MainNav from "./Mainnav";
import Copyright from "./Copyright";
import Appbar from "./AppBar";

const Home = ({ history, user, checkLogedIn, logout }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuopen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (checkLogedIn() === false || !user.isAuthenticated) {
      logout();
      history.push("/auth");
    }
  });

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer open={open} handleDrawerClose={handleDrawerClose} />
        <Appbar
          history={history}
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleMenu={handleMenu}
          anchorEl={anchorEl}
          menuopen={menuopen}
          handleClose={handleClose}
          logout={logout}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            <MainNav />
          </Container>
        </main>
      </div>
      <Box pt={4}>
        <Copyright />
      </Box>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = { checkLogedIn, logout };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
