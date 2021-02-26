import React from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, Divider, createMuiTheme } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import useStyles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import LayersIcon from "@material-ui/icons/Layers";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default ({ open, handleDrawerClose }) => {
  const classes = useStyles();

  const ResponsiveLink = props => {
    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down("sm"));
    if (downSm === true) {
      return <Link onClick={handleDrawerClose} {...props} />;
    } else {
      return <Link {...props} />;
    }
  };

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div>
        <ResponsiveLink
          to={{
            pathname: "/",
            key: Math.random(),
            state: {
              applied: false
            }
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='홈' />
          </ListItem>
        </ResponsiveLink>
        <ResponsiveLink
          to={{
            pathname: "/notice/전체/1",
            key: Math.random(),
            state: {
              applied: false
            }
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary='공지사항' />
          </ListItem>
        </ResponsiveLink>
        <ResponsiveLink
          to={{
            pathname: "/workhour",
            key: Math.random(),
            state: {
              applied: false
            }
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary='근무시간 조회' />
          </ListItem>
        </ResponsiveLink>
        <ResponsiveLink
          to={{
            pathname: "/room",
            key: Math.random(),
            state: {
              applied: false
            }
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <EmojiObjectsIcon />
            </ListItemIcon>
            <ListItemText primary='회의실 예약' />
          </ListItem>
        </ResponsiveLink>
        <ResponsiveLink
          to={{
            pathname: "/team",
            key: Math.random(),
            state: {
              applied: false
            }
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='팀 관리' />
          </ListItem>
        </ResponsiveLink>
        <ResponsiveLink
          to={{
            pathname: "/project",
            key: Math.random(),
            state: {
              applied: false
            }
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary='프로젝트' />
          </ListItem>
        </ResponsiveLink>
      </div>
    </Drawer>
  );
};
