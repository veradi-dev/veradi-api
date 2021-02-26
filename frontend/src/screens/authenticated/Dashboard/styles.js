import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  fullSize: {
    width: "100%",
    height: "100%"
  },
  center: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 300
  },
  smallfixedHeight: {
    height: 160,
    marginBottom: 10
  },
  verysmallfixedHeight: {
    height: 130
  },
  avatar: {
    backgroundColor: "#000000",
    height: 30,
    width: 30
  }
}));
