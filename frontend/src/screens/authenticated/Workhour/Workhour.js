import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../Title";
import { connect } from "react-redux";
import "./Workhour.css";
import DateComboBox from "../../../components/DateComboBox";
import Workhourtable from "./../../../components/Workhourtable";
import { getMyWorkhours } from "~/frontend/src/redux/workhours/workhoursThunks";
import { getDate } from "~/frontend/src/utils";

const headCells = [
  { id: "date", numeric: false, disablePadding: false, label: "일자" },
  { id: "start", numeric: false, disablePadding: false, label: "출근시간" },
  { id: "end", numeric: false, disablePadding: false, label: "퇴근시간" },
  { id: "total", numeric: false, disablePadding: false, label: "총 근무시간" },
  { id: "status", numeric: false, disablePadding: false, label: "상태" }
];
const isEqualDate = (date_string, date_object) => {
  const ds = new Date(date_string);
  return (
    ds.getFullYear() === date_object.year &&
    ds.getMonth() + 1 === date_object.month
  );
};

const Workhour = ({ user, workhours, getMyWorkhours }) => {
  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column"
    },
    fixedHeight: {
      height: 240
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
  const classes = useStyles();
  const [date, setdate] = React.useState(getDate());
  const [rows, setRows] = React.useState(false);

  const search = useCallback(() => {
    getMyWorkhours(date.year, date.month);
  }, [date]);

  useEffect(() => {
    const createData = () => {
      return workhours
        .filter(
          workhour => workhour.complete && isEqualDate(workhour.start, date)
        )
        .map(workhour => ({
          id: workhour.id,
          date: `${workhour.start.slice(8, 10)}일`,
          start: ` ${workhour.start.slice(11, 13)}시 ${workhour.start.slice(
            14,
            16
          )}분`,
          end: `${workhour.end.slice(11, 13)}시 ${workhour.end.slice(
            14,
            16
          )}분`,
          total: `${parseInt(workhour.total / 3600)}시간 ${parseInt(
            (workhour.total % 3600) / 60
          )}분`,
          status: workhour.message
        }));
    };
    setRows(createData());
  }, [workhours]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Title>{user.last_name + user.first_name}님의 근무시간</Title>
            <Grid
              container
              direction='row'
              justify='space-evenly'
              alignItems='center'
            >
              <Grid>
                <DateComboBox date={date} setdate={setdate}></DateComboBox>
              </Grid>
              <Grid>
                <Button onClick={search} color='primary' variant='contained'>
                  검색
                </Button>
              </Grid>
            </Grid>
            <Workhourtable rows={rows} headCells={headCells}></Workhourtable>
          </React.Fragment>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  workhours: state.workhours
});
export default connect(mapStateToProps, { getMyWorkhours })(Workhour);
