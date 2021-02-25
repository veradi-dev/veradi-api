import React from "react";

import { logout } from "../../../redux/user/userThunks";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import useStyles from "./styles";
import LogoImage from "../../../../assets/veradi/logo.png";
import clsx from "clsx";

export default ({
  history,
  open,
  handleDrawerOpen,
  handleMenu,
  anchorEl,
  menuopen,
  handleClose,
  logout
}) => {
  const classes = useStyles();
  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={LogoImage}
          className={classes.logo}
          onClick={() => history.push("/")}
        />
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        >
          VERADI
        </Typography>

        <div>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='default'
          >
            <AccountCircle style={{ fontSize: 30 }} />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={menuopen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>내 계정 관리</MenuItem>
            <MenuItem
              onClick={() => {
                logout();
              }}
            >
              로그아웃
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
