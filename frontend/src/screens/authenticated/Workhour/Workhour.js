import React, { useState, useEffect, useCallback, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../Title";
import { connect } from "react-redux";
import "./Workhour.css";
import DateComboBox from "../../../components/DateComboBox";
import Workhourtable from "./../../../components/Workhourtable";
import WorkhourCorrectionDialog from "./WorkhourCorrectionDialog";
import { getMyWorkhours } from "~/frontend/src/redux/workhours/workhoursThunks";
import { getDate } from "~/frontend/src/utils";

const headCells = [
  { id: "collapseBtn", numeric: false, disablePadding: false, label: "" },
  { id: "date", numeric: false, disablePadding: false, label: "일자" },
  { id: "start", numeric: false, disablePadding: false, label: "출근시간" },
  { id: "end", numeric: false, disablePadding: false, label: "퇴근시간" },
  { id: "total", numeric: false, disablePadding: false, label: "총 근무시간" },
  { id: "status", numeric: false, disablePadding: false, label: "상태" },
  { id: "btn", numeric: false, disablePadding: false, label: "이의신청" }
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
  const [date, setDate] = React.useState(getDate());
  const [rows, setRows] = React.useState(false);
  const search = useCallback(() => {
    getMyWorkhours(date.year, date.month);
  }, [date]);
  const [total, setTotal] = React.useState(0);

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
          total_int: workhour.total,
          total: `${parseInt(workhour.total / 3600)}시간 ${parseInt(
            (workhour.total % 3600) / 60
          )}분`,
          status_code: workhour.status,
          status: () => (
            <Typography variant='caption'>{workhour.message}</Typography>
          ),
          btn: () => (
            <WorkhourCorrectionDialog
              key={`workhour${workhour.start}`}
              workhour={workhour}
            />
          ),
          enter_logs: workhour.enter_logs
        }));
    };
    setRows(createData());
  }, [workhours, open]);

  useEffect(() => {
    let totalWorkhour = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status_code === 1) {
        totalWorkhour += rows[i].total_int;
      }
    }
    setTotal(totalWorkhour);
  }, [rows, date]);

  // 처음 접속하면 검색시킴
  useEffect(() => {
    search();
  }, []);
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
                <DateComboBox date={date} setdate={setDate}></DateComboBox>
              </Grid>
              <Grid>
                <Button onClick={search} color='primary' variant='contained'>
                  검색
                </Button>
              </Grid>
            </Grid>
            <Typography>
              총 {parseInt(total / 3600)}시간 {parseInt((total % 3600) / 60)}분
              입니다.
            </Typography>
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
