import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import "./Team.css";
import TeamWorkhourBoard from "./TeamWorkhourBoard";
import WorkhourCorrectionRequestList from "./WorkhourCorrectionRequestTable";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  fixedHeight: {
    height: "50vh",
    overflow: "scroll"
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Team = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <Typography variant='h6'>{user.team} 근무시간 현황</Typography>
          <TeamWorkhourBoard />
        </Paper>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <Typography variant='h6'>근무시간 신규 이의신청</Typography>
          <div style={{ height: "30px" }} />
          <WorkhourCorrectionRequestList />
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Team);
