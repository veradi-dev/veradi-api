import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { checkLogedIn, logout } from "../../../redux/user/userThunks";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import useStyles from "./styles";
import Drawer from "./Drawer";
import MainNav from "./MainNav";
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
