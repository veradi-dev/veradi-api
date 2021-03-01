import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export default makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    background: "linear-gradient(-37deg, rgb(162, 228, 192), rgb(67, 102, 137))"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: 0,
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      display: "block"
    },

    transition: theme.transitions.create(["width", "display"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    opacity: 0,
    width: 0,

    transition: theme.transitions.create(["width", "opacity"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen
    }),
    cursor: "default"
  },
  title: {
    flexGrow: 1
  },
  logo: {
    width: "2.5rem",
    cursor: "pointer"
  },
  drawerPaper: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      width: `100%`
    },
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      width: drawerWidth
    },
    backgroundColor: "rgb(237, 245, 241)",
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    [theme.breakpoints.down("sm")]: {
      width: 0
    },
    width: theme.spacing(7),
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  link: { textDecoration: "none", color: "black" }
}));
