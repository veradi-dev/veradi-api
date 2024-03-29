import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { red, green } from "@material-ui/core/colors";
import { Box, CircularProgress, Container } from "@material-ui/core";

import "./Workhour.css";
import DateComboBox from "../../../components/DateComboBox";
const Workhourtable = lazy(() => import("./Workhourtable"));
const WorkhourCorrectionDialog = lazy(() =>
  import("./WorkhourCorrectionDialog")
);
import { getMyWorkhours } from "~/frontend/src/redux/workhours/workhoursThunks";
import { getDate } from "~/frontend/src/utils";
import { getMyWorkhoursRequest } from "../../../api/workhours";
import { alertActions } from "../../../redux/alert/alertSlice";

const headCells = [
  { id: "collapseBtn", numeric: false, disablePadding: false, label: "" },
  { id: "date", numeric: false, disablePadding: false, label: "일자" },
  { id: "start", numeric: false, disablePadding: false, label: "출근시각" },
  { id: "end", numeric: false, disablePadding: false, label: "퇴근시각" },
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

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  acjc: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  },
  DateComboBox: {}
}));

const Workhour = ({ user, workhoursThisMonth, getMyWorkhours }) => {
  const classes = useStyles();
  const [date, setDate] = useState(getDate());
  const [rows, setRows] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [workhours, setWorkhours] = useState(workhoursThisMonth);
  const dispatch = useDispatch();

  const search = () => {
    setLoading(true);
    getMyWorkhoursRequest({
      token: user.token,
      userId: user.id,
      year: date.year,
      month: date.month
    })
      .then(res => {
        if (res.status === 200) {
          setWorkhours(res.data);
        }
      })
      .catch(e => {
        dispatch(alertActions.error("데이터를 불러올 수 없습니다."));
      })
      .finally(() => setLoading(false));
  };

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
            <Tooltip title={`${workhour.message}`}>
              {workhour.status === 1 ? (
                <CheckCircleIcon
                  fontSize='small'
                  style={{ color: green[500] }}
                />
              ) : (
                <ErrorIcon fontSize='small' style={{ color: red[500] }} />
              )}
            </Tooltip>
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
            <Typography
              component='h2'
              variant='h6'
              color='primary'
              gutterBottom
            >
              {user.last_name + user.first_name}님의 근무시간
            </Typography>
            <Container
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <DateComboBox date={date} setDate={setDate}></DateComboBox>
              <Button onClick={search} color='primary' variant='contained'>
                검색
              </Button>
            </Container>
            <Typography
              variant='h6'
              gutterBottom
              style={{
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              총 {parseInt(total / 3600)}시간 {parseInt((total % 3600) / 60)}분
              입니다.
            </Typography>
            {loading ? (
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Workhourtable rows={rows} headCells={headCells}></Workhourtable>
            )}
          </React.Fragment>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  workhoursThisMonth: state.workhours
});
export default connect(mapStateToProps, { getMyWorkhours })(Workhour);
