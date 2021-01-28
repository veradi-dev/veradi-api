import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


export default function NoticeDetailPost({noticeData, num}) {
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
      console.log(noticeData[10]);
    return (
        <div>
          <Paper className={classes.paper}>
          <Grid container spacing={0}>
          <Grid item xs={3}>
          <Typography align="center" color="inherit" variant="h5" component="div">
          제목
        </Typography>
        </Grid>
        <Grid item xs={9}>
        <Typography align="left" color="inherit" variant="h5" component="div">
          {noticeData[num-1].title}
        </Typography>
        </Grid>
        </Grid>
        <br></br>
        <div className="fixdeletebtn">
        <Button color="primary" variant="contained">수정하기</Button>
        <Button color="primary" variant="contained">삭제하기</Button>
        </div>
        <Typography align="right" color="inherit" variant="subtitle2" component="div">
        {noticeData[num-1].writer.last_name+noticeData[num-1].writer.first_name}  2021년 1월 26일
        </Typography>
        <Divider />
        <br></br>
        <br></br>
        <Typography align="left" color="inherit" variant="body1" component="div">
        <div dangerouslySetInnerHTML={{ __html: noticeData[num-1].contents }} />
        </Typography>
        
          </Paper>
        </div>
    )
}
