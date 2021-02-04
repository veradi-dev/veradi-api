  
import React from 'react';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Noticelist from './Noticelist';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NoticeLayout from './NoticeLayout';
// import {Position} from '~/frontend/src/utils';

const Notice = ({user, match}) => {
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
            <NoticeLayout match={match} />
            </Paper>
        </Grid>
      </Grid>
    );
  };
  
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  export default connect(mapStateToProps)(Notice);