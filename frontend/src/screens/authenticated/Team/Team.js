import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Teamleadertable from "./Teamleadertable";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import "./Team.css";
import Position from "./../../../components/Position";
import DateComboBox from "./../../../components/DateComboBox";

const Team = ({ user }) => {
  const [Workhours, setWorkhours] = useState([]);

  const monthworkhour = {
    avg_per_date: 720, // 단위는 초(seconds)
    avg_per_person: 10800 // 단위는 초(seconds)
  };

  function createData (id, date, starttime, endtime, status) {
    return { id, date, starttime, endtime, status };
  }
  const rows = [
    createData("1", "12/1", "15:30", "16:30", "1"),
    createData("2", "12/2", "12:30", "16:30", "1"),
    createData("3", "12/3", "13:30", "16:30", "2"),
    createData("4", "12/4", "14:30", "16:30", "3"),
    createData("5", "12/1", "15:30", "16:30", "2"),
    createData("6", "12/2", "12:30", "16:30", "1"),
    createData("7", "12/3", "13:30", "16:30", "1"),
    createData("8", "12/4", "14:30", "16:30", "1")
  ];
  const secondtohour = seconds => {
    let hour = parseInt(seconds / 3600);
    let min = parseInt((seconds % 3600) / 60);
    let sec = seconds % 60;
    return hour + "시간" + min + "분";
  };

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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [date, setdate] = React.useState({
    year: "2020",
    month: "1"
  });
  const [personresult, setpersonresult] = React.useState(false);
  const [result, setresult] = React.useState(false);
  const searchavg = e => {
    e.preventDefault();
    console.log(state);
    setresult(true);
  };
  const searchteamperson = e => {
    e.preventDefault();
    console.log(state);
    setpersonresult(true);
  };
  const [text, settext] = useState("");
  const onChange = e => {
    settext(e.target.value);
  };

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  return (
    <Grid container spacing={3}>
      {Position(user) > 2 ? (
        <React.Fragment>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>근무시간 이의제기 목록</Title>
                <Teamleadertable></Teamleadertable>
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>{user.team} 팀원 근무시간</Title>

                <span className='searchbtn'>
                  <input
                    className='commentinput'
                    value={text}
                    onChange={onChange}
                    placeholder='팀원 이름을 입력하세요'
                  ></input>
                  <Button
                    onClick={searchteamperson}
                    color='primary'
                    variant='contained'
                  >
                    검색
                  </Button>
                </span>

                {personresult ? (
                  <div>
                    <Typography color='textSecondary' variant='h6'>
                      조은학님
                    </Typography>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center'>날짜</TableCell>
                          <TableCell align='center'>출근시간</TableCell>
                          <TableCell align='center'>퇴근시간</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.id}>
                            <TableCell align='center'>{row.date}</TableCell>
                            <TableCell align='center'>
                              {row.starttime}
                            </TableCell>
                            <TableCell align='center'>{row.endtime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div></div>
                )}
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <React.Fragment>
                <Title>{user.team} 평균 근무시간</Title>
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
                    <Button
                      onClick={searchavg}
                      color='primary'
                      variant='contained'
                    >
                      검색
                    </Button>
                  </Grid>
                </Grid>
                {result ? (
                  <div>
                    <Typography color='textSecondary' variant='h6'>
                      {user.team} 각 개인의 근무시간의 총합의 평균
                    </Typography>
                    <Typography color='textPrimary' variant='h5'>
                      {secondtohour(monthworkhour.avg_per_person)}
                    </Typography>

                    <Typography color='textSecondary' variant='h6'>
                      {user.team} 일별 평균
                    </Typography>
                    <Typography color='textPrimary' variant='h5'>
                      {secondtohour(monthworkhour.avg_per_date)}
                    </Typography>
                  </div>
                ) : (
                  <div></div>
                )}
              </React.Fragment>
            </Paper>
          </Grid>{" "}
        </React.Fragment>
      ) : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            팀장 이상만 접근할 수 있는 페이지입니다.
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Team);
