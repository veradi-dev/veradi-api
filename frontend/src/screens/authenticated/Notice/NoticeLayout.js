import React, { useState } from "react";
import Noticelist from './Noticelist';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

import { connect } from "react-redux";
import './NoticeLayout.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));



const NoticeLayout=({user, match})=> {
  
  const [Team, setTeam] = useState("전체");
  const handleAll = () => {
    setTeam("전체");
  };
  const handleTeam = () => {
    setTeam(user.team);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
          <Grid item xs={6}>
            <Link to={`/notice/전체/noticelist/1`} style={{ textDecoration: 'none', color: 'black' }}>
            <button onClick={handleAll} className="NoticeTab">전체</button>
            </Link>
          </Grid>
          <Grid item xs={6}>
          <Link to={`/notice/${user.team}/noticelist/1`} style={{ textDecoration: 'none', color: 'black' }}>
            <button onClick={handleTeam} className="NoticeTab">{user.team}</button>
            </Link>
          </Grid>
        </Grid>
        <Noticelist Team={Team} match={match}></Noticelist>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(NoticeLayout);