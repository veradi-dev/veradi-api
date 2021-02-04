import React, {useEffect, useState, useReducer, useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Calendar from 'react-calendar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@material-ui/core';
import './Room.css';
import Title from '../Title';
import TimeBtn from './TimeBtn';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import axios from "axios";
import { connect } from "react-redux";
import {getPosition} from './../../../utils';


let initialState = {
  times: [
    {id:0, time:"00:00" ,active:false, team:null, booked:false},
    {id:1, time:"00:30" ,active:false, team:null, booked:false},
    {id:2, time:"01:00" ,active:false, team:null, booked:false},
    {id:3, time:"01:30" ,active:false, team:null, booked:false},
    {id:4, time:"02:00" ,active:false, team:null, booked:false},
    {id:5, time:"02:30" ,active:false, team:null, booked:false},
    {id:6, time:"03:00" ,active:false, team:null, booked:false},
    {id:7, time:"03:30" ,active:false, team:null, booked:false},
    {id:8, time:"04:00" ,active:false, team:null, booked:false},
    {id:9, time:"04:30" ,active:false, team:null, booked:false},
    {id:10, time:"05:00", active:false, team:null, booked:false},
    {id:11, time:"05:30", active:false, team:null, booked:false},
    {id:12, time:"06:00", active:false, team:null, booked:false},
    {id:13, time:"06:30", active:false, team:null, booked:false},
    {id:14, time:"07:00", active:false, team:null, booked:false},
    {id:15, time:"07:30", active:false, team:null, booked:false},
    {id:16, time:"08:00", active:false, team:null, booked:false},
    {id:17, time:"08:30", active:false, team:null, booked:false},
    {id:18, time:"09:00", active:false, team:null, booked:false},
    {id:19, time:"09:30", active:false, team:null, booked:false},
    {id:20, time:"10:00", active:false, team:null, booked:false},
    {id:21, time:"10:30", active:false, team:null, booked:false},
    {id:22, time:"11:00", active:false, team:null, booked:false},
    {id:23, time:"11:30", active:false, team:null, booked:false},
    {id:24, time:"12:00", active:false, team:null, booked:false},
    {id:25, time:"12:30", active:false, team:null, booked:false},
    {id:26, time:"13:00", active:false, team:null, booked:false},
    {id:27, time:"13:30", active:false, team:null, booked:false},
    {id:28, time:"14:00", active:false, team:null, booked:false},
    {id:29, time:"14:30", active:false, team:null, booked:false},
    {id:30, time:"15:00", active:false, team:null, booked:false},
    {id:31, time:"15:30", active:false, team:null, booked:false},
    {id:32, time:"16:00", active:false, team:null, booked:false},
    {id:33, time:"16:30", active:false, team:null, booked:false},
    {id:34, time:"17:00", active:false, team:null, booked:false},
    {id:35, time:"17:30", active:false, team:null, booked:false},
    {id:36, time:"18:00", active:false, team:null, booked:false},
    {id:37, time:"18:30", active:false, team:null, booked:false},
    {id:38, time:"19:00", active:false, team:null, booked:false},
    {id:39, time:"19:30", active:false, team:null, booked:false},
    {id:40, time:"20:00", active:false, team:null, booked:false},
    {id:41, time:"20:30", active:false, team:null, booked:false},
    {id:42, time:"21:00", active:false, team:null, booked:false},
    {id:43, time:"21:30", active:false, team:null, booked:false},
    {id:44, time:"22:00", active:false, team:null, booked:false},
    {id:45, time:"22:30", active:false, team:null, booked:false},
    {id:46, time:"23:00", active:false, team:null, booked:false},
    {id:47, time:"23:30", active:false, team:null, booked:false}
  ]
};

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);



const Room = ({user}) => {
  const [value, onChange] = useState(new Date());
  const [reserveresult, setreserveresult]=useState([]);
  const [loading, setLoading] = useState(true);
  const [room, setroom] = React.useState('1');
  function reducer(state, action) {
    switch (action.type) {
      case 'TOGGLE':
        return {
          ...state,
          times:state.times.map((time)=>
            time.id===action.id ? {...time, active: !time.active}: time)};
      default:
        return state;
    }
  }

  function setinitialState(initialState, reserveresult) {
    for(let i=0;i<Object.keys(initialState.times).length;i++){
      for(let t=0;t<Object.keys(reserveresult).length;t++){
        initialState.times[i].booked=false;
        initialState.times[i].team=null;
    }}
    for(let i=0;i<Object.keys(initialState.times).length;i++){
      for(let t=0;t<Object.keys(reserveresult).length;t++){
      if(initialState.times[i].id==reserveresult[t].start_time && parseInt(room)==reserveresult[t].room){
        initialState.times[i].booked=true;
        initialState.times[i].team=reserveresult[t].team;
      }}}

          return <React.Fragment>
          <Typography component="div">
      <Grid component="label" container alignItems="center" justify="center" spacing={1}>
      <Grid item>오전</Grid>
      <Grid item>
        <AntSwitch checked={morningstate.ismorning} onChange={handleChange} name="ismorning" />
      </Grid>
      <Grid item>오후</Grid>
      </Grid>
      </Typography>
      {morningstate.ismorning ? <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              p={2}
            >
      <TimeBtn times={times.slice(24,48)} onToggle={onToggle} user={user}></TimeBtn>
      <div>
      </div>
      <span className="reservebtn">
      <Button variant="contained" color="primary" onClick={handleSubmit}>
      예약하기
      </Button>
      <Button variant="contained" color="secondary" onClick={() => alert("예약을 취소하시겠습니가??")}>
      예약취소하기
      </Button>
      </span>

      </Box>: <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              p={2}
            >
      <TimeBtn times={times.slice(0,24)} onToggle={onToggle} user={user}></TimeBtn>
      <div>
      </div>
      <span className="reservebtn">
      <Button variant="contained" color="primary" onClick={() => alert("예약되었습니다!")}>
      예약하기
      </Button>
      <Button variant="contained" color="secondary" onClick={() => alert("예약을 취소하시겠습니가??")}>
      예약취소하기
      </Button>
      </span>

      </Box>
      }</React.Fragment>
}
  useEffect(() => {
    setLoading(true);
    axios.get(`/api/v1/conference?year=${value.getFullYear()}&month=${value.getMonth()+1}&day=${value.getDate()}`, {'headers':{'Authorization':'Token ' + `${user.token}`}}).then((res) => {
      console.log(res.data);
      setreserveresult(res.data);
    setLoading(false);
    }).catch((err)=>{
      const status = err?.response?.status;
      // if (status === undefined) {
      //   console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
      // }
      if (status === 400) {
        console.dir("400에러");
      }
      else if (status === 401) {
        console.dir("401에러");
      }
      else if (status === 500) {
        console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
      }
      });
  }, [value, room]);


  
  const [morningstate, setmorning] = React.useState({
    ismorning: true,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { times } = state;
  const onToggle = useCallback(id => {
    dispatch({type: 'TOGGLE',id});
  }, []);

  const handleRoom = (event) => {
    setroom(event.target.value);
  };


  function findActive(state){
    console.log(state);
  }
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

const data = [{
        "room":"1",
        "date":"2021-02-19",
        "start_time":"44",
        "proposer":"1"
    },
    {
      "room":"1",
        "date":"2021-02-19",
        "start_time":"45",
        "proposer":"1"
  },
  {
    "room":"1",
        "date":"2021-02-19",
        "start_time":"46",
        "proposer":"1"
  },
  ];
axios.post(`/api/v1/conference/`, data, {'headers':{'Authorization':'Token ' + `${user.token}`}})
  .then((res) => {
      console.log(res);
  })
  .catch((err) => {
  const status = err?.response?.status;
  console.log(err);
  if (status === undefined) {
      console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
  }
  else if (status === 400) {
      alert("");
      console.dir("400에러");
  }
  else if (status === 500) {
      console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
  }
  else{
      history.push('/notice/전체/noticelist/1')
  }
  }
  );
  };

  
  
  const handleChange = (event) => {
    setmorning({ ...morningstate, [event.target.name]: event.target.checked });
  };
  
    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          overflow: 'auto',
          flexDirection: 'column',
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
      {getPosition(user)>1 ? 
          <React.Fragment>
        <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <Title>회의실 예약</Title>
              <FormControl component="fieldset">
                <FormLabel component="legend">회의실</FormLabel>
                <RadioGroup aria-label="room" name="room" value={room} onChange={handleRoom}>
                  <FormControlLabel value='1' control={<Radio color="primary" />} label="회의실" />
                  <FormControlLabel value='2' control={<Radio color="primary"/>} label="탕비실" />
                </RadioGroup>
              </FormControl>
              <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  p={2}
                >
              <Calendar
                onChange={onChange}
                value={value}
              />
              </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              {loading? <div>로딩중입니다.</div>: 
                      <div>
                      {setinitialState(initialState, reserveresult)} 
                      </div>
                      }
              </Paper>
            </Grid>
            </React.Fragment>:<Grid item xs={12}>
      <Paper className={classes.paper}>
        타스크장 이상만 회의실을 예약할 수 있습니다.
      </Paper>
    </Grid>
}
      </Grid>
    );
  };
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  export default connect(mapStateToProps)(Room);


  /*
  
        <FormControl required component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">장소는 한 곳만 골라주세요</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={room1} color="primary" onChange={handleRoom} name="room1" />}
            label="회의실"
          />
          <FormControlLabel
            control={<Checkbox checked={room2} color="primary" onChange={handleRoom} name="room2" />}
            label="탕비실"
          />
        </FormGroup>
      </FormControl>*/