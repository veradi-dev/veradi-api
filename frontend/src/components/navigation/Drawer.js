import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import TimelapseIcon from "@material-ui/icons/Timelapse";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
});

const TemporaryDrawer = ({ history }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={"announcement"}>
          <ListItemIcon>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary={"ㅁㄴㅇㅎ"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={"searchQuestion"}
          onClick={() => history.push("/projects/questions")}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"문항 조회"} />
        </ListItem>
        <ListItem
          button
          key={"registerQuestion"}
          onClick={() => history.push("/projects/questions/registration")}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={"문항 등록"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={"searchProject"}
          onClick={() => history.push("/projects")}
        >
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary={"프로젝트 조회"} />
        </ListItem>
        <ListItem
          button
          key={"registerProject"}
          onClick={() => history.push("/projects/registration")}
        >
          <ListItemIcon>
            <CreateNewFolderIcon />
          </ListItemIcon>
          <ListItemText primary={"프로젝트 등록"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"checkWorkHour"}>
          <ListItemIcon>
            <TimelapseIcon />
          </ListItemIcon>
          <ListItemText primary={"근무시간 조회"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            style={{ fontSize: 30 }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default withRouter(TemporaryDrawer);
