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
const initialState = {
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
    {id:11, time:"05:30", active:false, team:"지구과학팀", booked:true},
    {id:12, time:"06:00", active:false, team:"지구과학팀", booked:true},
    {id:13, time:"06:30", active:false, team:"지구과학팀", booked:true},
    {id:14, time:"07:00", active:false, team:"지구과학팀", booked:true},
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
    {id:26, time:"13:00", active:false, team:"생명과학팀", booked:true},
    {id:27, time:"13:30", active:false, team:"생명과학팀", booked:true},
    {id:28, time:"14:00", active:false, team:"생명과학팀", booked:true},
    {id:29, time:"14:30", active:false, team:"생명과학팀", booked:true},
    {id:30, time:"15:00", active:false, team:"생명과학팀", booked:true},
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
    {id:42, time:"21:00", active:false, team:"수학팀", booked:true},
    {id:43, time:"21:30", active:false, team:"수학팀", booked:true},
    {id:44, time:"22:00", active:false, team:"수학팀", booked:true},
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

const Room = () => {
  const [morningstate, setmorning] = React.useState({
    ismorning: true,
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { times } = state;
  const onToggle = useCallback(id => {
    console.log('asdgasdg');
    dispatch({type: 'TOGGLE',id});
  }, []);

  const handleChange = (event) => {
    setmorning({ ...morningstate, [event.target.name]: event.target.checked });
    console.log(morningstate);
  };
    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 400,
        },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
      const [value, onChange] = useState(new Date());
      console.log(value);
      const getreservation = (value) => {
        console.log(value);
            };
    
    return (
    <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <Title>회의실 예약</Title>
              <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  p={2}
                >
              <Calendar
                onChange={onChange}
                value={value}
                onclick={getreservation}
              />
              </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>오전</Grid>
          <Grid item>
            <AntSwitch checked={morningstate.ismorning} onChange={handleChange} name="ismorning" />
          </Grid>
          <Grid item>오후</Grid>
        </Grid>
      </Typography>
      {morningstate.ismorning ? <Container>
    <TimeBtn times={times.slice(24,48)} onToggle={onToggle}></TimeBtn>
    <div>
    <button text={`예약하기`} onClick={() => alert("예약되었습니다!")}></button>
    </div>
  </Container>: <Container>
      <TimeBtn times={times.slice(0,24)} onToggle={onToggle}></TimeBtn>
      <div>
      <button text={`예약하기`} onClick={() => alert("예약되었습니다!")}></button>
      </div>
    </Container>
    }
              </Paper>
            </Grid>
      </Grid>
    );
  };
  
  export default Room;