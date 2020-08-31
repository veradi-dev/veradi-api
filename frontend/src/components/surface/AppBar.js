import React from "react";
import { withRouter } from "react-router-dom";
import TemporaryDrawer from "../navigation/Drawer";
import LogoImage from "../../../assets/veradi/logo.png";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  menuButton: {
    marginLeft: theme.spacing(2),
    marginTop: "auto",
    marginBottom: "auto",
    width: "3.5rem",
    height: "3.5rem",
  },
  toobar: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  logo: {
    width: "2.5rem",
    cursor: "pointer",
  },
  options: {
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

function MenuAppBar({ history, logout }) {
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
          <div>
            <img
              src={LogoImage}
              className={classes.logo}
              onClick={() => history.push("/")}
            />
          </div>
          <div className={classes.options}>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="default"
              aria-label="menu"
              size="medium"
            >
              <TemporaryDrawer />
            </IconButton>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="default"
              >
                <AccountCircle style={{ fontSize: 30 }} />
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MenuAppBar);
