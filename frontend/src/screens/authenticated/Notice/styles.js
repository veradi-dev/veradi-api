import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    minHeight: "60vh",
    display: "flex",
    overflowX: "scroll",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "flex-start"
  },
  fixedHeight: {
    height: "70vh"
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 300,
    minHeight: "50vh"
  },
  row: {
    "& :first-child": {
      [theme.breakpoints.down("sm")]: {
        textAlign: "right"
      }
    },
    minWidth: 300,
    maxHeight: "2rem"
  },
  NoWrapCell: {
    [theme.breakpoints.down("sm")]: {
      "> p": { fontSize: "0.3rem" },
      ":first-child": { textAlign: "right" }
    }
  },
  columnText: {
    whiteSpace: "nowrap"
  },
  itemCell: {
    height: "1rem",
    whiteSpace: "nowrap"
  }
}));
