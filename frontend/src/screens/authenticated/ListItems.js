import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import LayersIcon from "@material-ui/icons/Layers";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Typography,
  makeStyles,
  ListItemAvatar
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));
const user = {
  jobTitle: "기술개발팀 기술개발부",
  name: "조은학"
};

const NavItem = () => {
  const classes = useStyles();
  return (
    <div>
      <Link
        to={{
          pathname: "/",
          key: Math.random(),
          state: {
            applied: false
          }
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='홈' />
        </ListItem>
      </Link>
      <Link
        to={{
          pathname: "/notice/전체/1",
          key: Math.random(),
          state: {
            applied: false
          }
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary='공지사항' />
        </ListItem>
      </Link>
      <Link
        to={{
          pathname: "/workhour",
          key: Math.random(),
          state: {
            applied: false
          }
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary='근무시간 조회' />
        </ListItem>
      </Link>
      <Link
        to={{
          pathname: "/room",
          key: Math.random(),
          state: {
            applied: false
          }
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <EmojiObjectsIcon />
          </ListItemIcon>
          <ListItemText primary='회의실 예약' />
        </ListItem>
      </Link>
      <Link
        to={{
          pathname: "/team",
          key: Math.random(),
          state: {
            applied: false
          }
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='팀 관리' />
        </ListItem>
      </Link>
      <Link
        to={{
          pathname: "/project",
          key: Math.random(),
          state: {
            applied: false
          }
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary='프로젝트' />
        </ListItem>
      </Link>
    </div>
  );
};

export default NavItem;
