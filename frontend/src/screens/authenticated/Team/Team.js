import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Teamleadertable from "./WorkhourCorrectionRequestTable";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import "./Team.css";
import DateComboBox from "./../../../components/DateComboBox";
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
