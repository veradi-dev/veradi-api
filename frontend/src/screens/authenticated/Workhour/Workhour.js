import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Title from "../Title";
import axios from "axios";
import { connect } from "react-redux";
import "./Workhour.css";
import Findyearmon from "./../../../components/Findyearmon";
import Workhourtable from "./../../../components/Workhourtable";

// const columns = [
//   { field: 'date', headerName: '날짜', width: 100 },
//   { field: 'starttime', headerName: '출근시간', width: 110 },
//   { field: 'endtime', headerName: '퇴근시간', width: 110 },
//   { field: 'status',headerName: '상태',type: 'number',width: 100,},
// ];

// const rows =
// // [
// // ];

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
const headCells = [
  { id: "date", numeric: false, disablePadding: true, label: "날짜" },
  { id: "starttime", numeric: false, disablePadding: false, label: "출근시간" },
  { id: "endtime", numeric: false, disablePadding: false, label: "퇴근시간" },
  { id: "status", numeric: true, disablePadding: false, label: "상태" }
];



const Workhour = ({ user }) => {
  const [Workhours, setWorkhours] = useState([]);
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
  const [personalresult, setpersonalresult] = React.useState(false);
  const searchavg = e => {
    e.preventDefault();
    console.log(date);
    setpersonalresult(true);
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


  useEffect(() => {
    // console.log(user.token);
    // const headers = {
    //   Authorization: 'Token bee2aa204fa6f7cceaea15c1074eb86fb0e14d6d3a38955d61ffd75c258bf5e6',
    //   'Content-Type': 'application/json'
    //   }
    axios.get(`/api/v1/workhours?user=1&month=1`, {'headers':{'Authorization':'Token ' + `${user.token}`}}).then((res) => {
      setWorkhours(res.data);
      console.log("asdg",res.data);
    }).catch((err)=>{
			const status = err?.response?.status;
			if (status === undefined) {
				console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
			}
			else if (status === 400) {
				console.dir("400에러");
			}
			else if (status === 401) {
				console.dir("401에러");
			}
			else if (status === 500) {
				console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
			}
			});
	}, []);



    return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
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
                <Findyearmon date={date} setdate={setdate}></Findyearmon>
              </Grid>
              <Grid>
                <Button onClick={searchavg} color='primary' variant='contained'>
                  검색
                </Button>
              </Grid>
            </Grid>
            {personalresult ? (
              <Workhourtable rows={rows} headCells={headCells}></Workhourtable>
            ) : (
              <div></div>
            )}
          </React.Fragment>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Title>이상한 결과</Title>
            {personalresult ? (
              <Workhourtable rows={rows} headCells={headCells}></Workhourtable>
            ) : (
              <div></div>
            )}
          </React.Fragment>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Workhour);
