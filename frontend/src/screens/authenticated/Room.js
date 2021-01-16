import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Calendar from 'react-calendar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';
import { Box } from '@material-ui/core';
import './Room.css';
import Title from './Title';
const Room = () => {
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
                onclick={(value)=>useEffect(onChange(value))}
              />
              </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              </Paper>
            </Grid>
      </Grid>
    );
  };
  
  export default Room;