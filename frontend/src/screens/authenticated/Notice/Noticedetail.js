import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './Noticedetail.css';
const Noticedetail = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Grid container spacing={3}>
          <Grid item xs={2}>
          <Typography align="center" color="inherit" variant="h5" component="div">
          제목
        </Typography>
        </Grid>
        <Grid item xs={8}>
        <Typography align="left" color="inherit" variant="h5" component="div">
          오늘의 공지사항입니다.
        </Typography>
        </Grid>
        <Grid item xs={2}>
        <Button color="primary" variant="contained">수정하기</Button>
        <Button color="primary" variant="contained">삭제하기</Button>
        </Grid>
        </Grid>
        <br></br>
        <Typography align="right" color="inherit" variant="subtitle2" component="div">
          조은학  2021년 1월 26일
        </Typography>
        <Divider />
        <br></br>
        <br></br>
        <Typography align="left" color="inherit" variant="body1" component="div">
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        
          </Paper>

          
        </Grid>
      </Grid>
    );
  };
  
  export default Noticedetail;