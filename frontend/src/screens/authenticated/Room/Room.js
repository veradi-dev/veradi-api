import React, { useEffect, useState, useReducer, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Calendar from "react-calendar";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "react-calendar/dist/Calendar.css";
import { Box, CircularProgress } from "@material-ui/core";
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
import { columnLookupSelector } from "@material-ui/data-grid";
import { getConferenceRequest } from "../../../api/conference";

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex"
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
        borderColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none"
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch);

function reducer (state, action) {
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
      return state.map(time => {
        if (payload.length == 0) {
          time.booked = false;
          time.team = null;
          time.active = false;
        }
        for (let i = 0; i < payload.length; i++) {
          time.booked = false;
          time.team = null;
          time.active = false;
        }
        for (let i = 0; i < payload.length; i++) {
          if (
            time.start_time === payload[i].start_time &&
            time.room === payload[i].room
          ) {
            time.pk = payload[i].id;
            time.booked = true;
            time.team = payload[i].team;
          }
        }
        return time;
      });
    //payload는 임의의 이름 이름을 바꿔도됨 , 주로 payload라는 이름으로 씀
    //id는 그냥 구분하기 위한 것....
    case "TOGGLE":
      return [
        ...state.map(time =>
          time.id === payload.id ? { ...time, active: !time.active } : time
        )
      ];
    default:
      return state;
  }
}

const initialState = [...Array(96).keys()].map(n => {
  const isMorning = n < 48 ? true : false;
  const hour = Math.floor(n / 4);
  const minute = Math.round(n % 2) === 0 ? "00" : "30";
  const start_time = hour * 2 + Math.round(n % 2);
  return {
    pk: null,
    id: n,
    start_time,
    isMorning,
    room: Math.round((n / 4) % 1) + 1,
    time: `${hour}:${minute}`,
    active: false,
    team: null,
    booked: false
  };
});

const Room = ({ user, getConference }) => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = React.useState("1");
  const [refresh, setRefresh] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const load = useCallback(payload => dispatch({ type: "LOAD", payload }), [
    date
  ]);
  const toggle = useCallback(id => {
    return dispatch({ type: "TOGGLE", payload: { id } });
  }, []);
  const [isMorning, setIsMorning] = React.useState(true);

  useEffect(() => {
    let isUnmount = false;
    setLoading(true);
    getConference(date)
      .then(res => {
        if (isUnmount === false) {
          load(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        const status = err?.response?.status;
        if (status === 400) {
          reduxDispatch(alertActions.error("잘못된 접근입니다."));
        } else if (status === 500) {
          reduxDispatch(
            alertActions.error("내부 서버 오류입니다.개발팀에 문의주세요.")
          );
        }
        if (isUnmount === false) {
          setLoading(false);
        }
      });
    return () => {
      isUnmount = true;
    };
  }, [date, room, refresh]);

  const handleSubmit = () => {
    let data = [];
    for (let i = 0; i < state.length; i++) {
      if (state[i].active == true) {
        data = data.concat({
          room: room,
          date:
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate(),
          start_time: state[i].start_time,
          proposer: user.id
        });
      }
    }
    axios
      .post(`/api/v1/conference/`, data, {
        headers: { Authorization: "Token " + `${user.token}` }
      })
      .then(res => {
        // window.location.reload();
        // alert("예약이 완료되었습니다.");
        setRefresh(!refresh);
        reduxDispatch(alertActions.success("예약이 완료되었습니다."));
      })
      .catch(err => {
        reduxDispatch(alertActions.error("예약 중 오류가 발생했습니다."));
        const status = err?.response?.status;
        console.log(err);
        if (status === undefined) {
          reduxDispatch(
            alertActions.error(
              "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
                JSON.stringify(err)
            )
          );
        } else if (status === 400) {
          reduxDispatch(alertActions.error("잘못된 접근입니다."));
        } else if (status === 500) {
          reduxDispatch(
            alertActions.error("내부 서버 오류입니다.개발팀에 문의주세요.")
          );
        }
      });
  };
  const handleDelete = () => {
    for (let i = 0; i < state.length; i++) {
      if (
        state[i].booked == true &&
        state[i].team == user.team &&
        state[i].active == true
      )
        axios
          .delete(`/api/v1/conference/${state[i].pk}`, {
            headers: { Authorization: "Token " + `${user.token}` }
          })
          .then(res => {
            setRefresh(!refresh);
          })
          .catch(err => {
            const status = err?.response?.status;
            console.log(err);
            if (status === undefined) {
              reduxDispatch(
                alertActions.error(
                  "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
                    JSON.stringify(err)
                )
              );
            } else if (status === 400) {
              reduxDispatch(alertActions.error("잘못된 접근입니다."));
            } else if (status === 500) {
              reduxDispatch(
                alertActions.error("내부 서버 오류입니다.개발팀에 문의주세요.")
              );
            }
          });
    }
  };

  const useStyles = makeStyles(theme => ({
    centerBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      padding: theme.spacing(2),
      overflow: "auto"
    },
    fixedHeight: {
      height: 500
    }
  }));
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>
      {getPosition(user) > 1 ? (
        <React.Fragment>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={fixedHeightPaper}>
              <Title>회의실 예약</Title>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>회의실</FormLabel>
                <RadioGroup
                  aria-label='room'
                  name='room'
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                >
                  <FormControlLabel
                    value='1'
                    control={<Radio color='primary' />}
                    label='회의실'
                  />
                  <FormControlLabel
                    value='2'
                    control={<Radio color='primary' />}
                    label='탕비실'
                  />
                </RadioGroup>
              </FormControl>
              <Box
                alignItems='center'
                display='flex'
                flexDirection='column'
                p={2}
              >
                <Calendar onChange={setDate} value={date} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={clsx(fixedHeightPaper, classes.centerBox)}>
              {loading ? (
                <CircularProgress />
              ) : (
                <React.Fragment>
                  <Typography component='div'>
                    <Grid
                      component='label'
                      container
                      alignItems='center'
                      justify='center'
                      spacing={1}
                    >
                      <Grid item>오전</Grid>
                      <Grid item>
                        <AntSwitch
                          checked={!isMorning}
                          onChange={event =>
                            setIsMorning(!event.target.checked)
                          }
                          name='ismorning'
                        />
                      </Grid>
                      <Grid item>오후</Grid>
                    </Grid>
                  </Typography>
                  <Box alignItems='center' display='flex' flexWrap='wrap' p={2}>
                    {state
                      .filter(
                        obj =>
                          obj.isMorning === isMorning &&
                          obj.room === parseInt(room)
                      )
                      .map(obj => {
                        return (
                          <Time
                            key={`TimeBtn${obj.id}`}
                            date={date}
                            time={obj}
                            toggleCallback={toggle}
                            user={user}
                          />
                        );
                      })}
                  </Box>
                  <Grid
                    container
                    className='reservebtn'
                    spacing={1}
                    style={{ marginTop: 30 }}
                  >
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                      >
                        예약하기
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleDelete}
                      >
                        예약취소
                      </Button>
                    </Grid>
                  </Grid>
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
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { getConference })(Room);
