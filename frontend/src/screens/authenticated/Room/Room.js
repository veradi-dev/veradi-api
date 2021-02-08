import React, { useEffect, useState, useReducer, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Calendar from "react-calendar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "react-calendar/dist/Calendar.css";
import { Box } from "@material-ui/core";
import "./Room.css";
import Title from "../Title";
import { Time } from "./TimeBtn";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { getPosition } from "./../../../utils";
import { getConference } from "~/frontend/src/redux/conference/conferenceThunk";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOAD":
      // {type: "LOAD", payload:
      // [
      //   {
      //     "room": 1,
      //     "date": "2021-01-17",
      //     "start_time": 4,
      //     "proposer": 1,
      //     "team": "기술개발 본부팀"
      //   }
      // ]

      return state.map((time) => {
        for (let i = 0; i < payload.length; i++) {
          time.booked = false;
          time.team = null;
        }
        for (let i = 0; i < payload.length; i++) {
          if (
            time.id === payload[i].start_time &&
            time.room === payload[i].room
          ) {
            time.booked = true;
            time.team = payload[i].team;
          }
        }
        return time;
      });
    case "TOGGLE":
      return [
        ...state.map((time) =>
          time.id === payload.id ? { ...time, active: !time.active } : time
        ),
      ];
    default:
      return state;
  }
}

const initialState = [...Array(96).keys()].map((n) => {
  const isMorning = n < 48 ? true : false;
  const hour = Math.floor(n / 4);
  const minute = Math.round(n % 2) * 30 === 0 ? "00" : "30";
  return {
    id: n,
    isMorning,
    room: Math.round((n / 4) % 1),
    time: `${hour}:${minute}`,
    active: false,
    team: null,
    booked: false,
  };
});

const Room = ({ user, getConference }) => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = React.useState("1");
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const load = useCallback((payload) => dispatch({ type: "LOAD", payload }), [
    date,
  ]);
  const toggle = useCallback((id) => {
    return dispatch({ type: "TOGGLE", payload: { id } });
  }, []);
  const [isMorning, setIsMorning] = React.useState(true);
  useEffect(() => {
    console.log(date);
    setLoading(true);
    getConference(date)
      .then((res) => {
        load(res.data);
        setLoading(false);
      })
      .catch((err) => {
        const status = err?.response?.status;
        // if (status === undefined) {
        //   console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
        // }
        if (status === 400) {
          console.dir("400에러");
        } else if (status === 401) {
          console.dir("401에러");
        } else if (status === 500) {
          console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
        }
        setLoading(false);
      });
  }, [date, room]);

  const handleSubmit = () => {
    //     const data = [{
    //       "room":room,
    //       "date":value.getFullYear()+"-"+value.getMonth()+"-"+value.getDate(),
    //       "start_time":"44",
    //       "proposer":user.id
    //   },
    //   {
    //     "room":room,
    //     "date":value.getFullYear()+value.getMonth()+value.getDate(),
    //     "start_time":"45",
    //     "proposer":user.id
    // },
    // {
    //   "room":room,
    //   "date":value.getFullYear()+value.getMonth()+value.getDate(),
    //   "start_time":"46",
    //   "proposer":user.id
    // },
    // ];

    const data = [
      {
        room: "1",
        date: "2021-02-19",
        start_time: "44",
        proposer: "1",
      },
      {
        room: "1",
        date: "2021-02-19",
        start_time: "45",
        proposer: "1",
      },
      {
        room: "1",
        date: "2021-02-19",
        start_time: "46",
        proposer: "1",
      },
    ];
    axios
      .post(`/api/v1/conference/`, data, {
        headers: { Authorization: "Token " + `${user.token}` },
      })
      .then((res) => {
        console.log(res);
        reduxDispatch(alertActions.success("예약이 완료되었습니다."));
      })
      .catch((err) => {
        reduxDispatch(alertActions.error("예약 중 오류가 발생했습니다."));
        const status = err?.response?.status;
        console.log(err);
        if (status === undefined) {
          console.dir(
            "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
              JSON.stringify(err)
          );
        } else if (status === 400) {
          alert("");
          console.dir("400에러");
        } else if (status === 500) {
          console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
        } else {
          history.push("/notice/전체/noticelist/1");
        }
      });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 500,
    },
  }));
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //console.log(value);

  return (
    <Grid container spacing={3}>
      {getPosition(user) > 1 ? (
        <React.Fragment>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Title>회의실 예약</Title>
              <FormControl component="fieldset">
                <FormLabel component="legend">회의실</FormLabel>
                <RadioGroup
                  aria-label="room"
                  name="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="회의실"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="탕비실"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                p={2}
              >
                <Calendar onChange={setDate} value={date} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={fixedHeightPaper}>
              {loading ? (
                <div>로딩중입니다.</div>
              ) : (
                <React.Fragment>
                  <Typography component="div">
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      justify="center"
                      spacing={1}
                    >
                      <Grid item>오전</Grid>
                      <Grid item>
                        <AntSwitch
                          checked={!isMorning}
                          onChange={(event) =>
                            setIsMorning(!event.target.checked)
                          }
                          name="ismorning"
                        />
                      </Grid>
                      <Grid item>오후</Grid>
                    </Grid>
                  </Typography>
                  <Box alignItems="center" display="flex" flexWrap="wrap" p={2}>
                    {state
                      .filter(
                        (obj) =>
                          obj.isMorning === isMorning &&
                          obj.room === parseInt(room)
                      )
                      .map((obj) => {
                        return (
                          <Time
                            key={`TimeBtn${obj.id}`}
                            time={obj}
                            toggleCallback={toggle}
                            user={user}
                          />
                        );
                      })}
                    <div></div>
                    <span className="reservebtn">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        예약하기
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => alert("예약을 취소하시겠습니가??")}
                      >
                        예약취소하기
                      </Button>
                    </span>
                  </Box>
                </React.Fragment>
              )}
            </Paper>
          </Grid>
        </React.Fragment>
      ) : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            타스크장 이상만 회의실을 예약할 수 있습니다.
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, { getConference })(Room);
