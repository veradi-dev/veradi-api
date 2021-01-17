import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Noticelist from '../Notice/Noticelist';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import {
  Avatar,
  Box,
  Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
const Dashboard = () => {
    const useStyles = makeStyles((theme) => ({
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 300,
      },
      smallfixedHeight: {
        height: 160,
        marginBottom:10
      },
      verysmallfixedHeight: {
        height: 130,
      },
      avatar: {
        backgroundColor: '#000000',
        height: 30,
        width: 30
      }
    }));
    const user = {
      //avatar: '/static/images/avatars/avatar_6.png',
      jobTitle: '기술개발부 기술개발팀',
      name: '조은학'
    };

    const workers = [
      {
        id:1,
        status: 'working',
        name: '오지석',
        starttime: '12/15',
      },
      {
        id:2,
        status: 'home',
        name: '조은학',
        starttime: '12/20',
      },
    ];

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const smallfixedHeightPaper = clsx(classes.paper, classes.smallfixedHeight);
    const verysmallfixedHeightPaper = clsx(classes.paper, classes.verysmallfixedHeight);
    return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Grid container direction="column" justify="space-evenly" alignItems="stretch">
              <Paper className={smallfixedHeightPaper}>
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  p={2}
                >
                  <Avatar
                    className={classes.avatar}
                    src={user.avatar}
                  />
                  <Typography
                    className={classes.name}
                    color="textPrimary"
                    variant="h6"
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                  >
                    {user.jobTitle}
                  </Typography>
                </Box>
              </Paper>
              <Paper className={verysmallfixedHeightPaper}>
              <Grid
                    container
                    justify="space-between"
                    spacing={3}
                  >
                    <Grid item>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                      >
                        이번달 근무시간
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                      >
                        111시간 11분
                      </Typography>
                    </Grid>
              </Grid>
              </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              <React.Fragment>
                <Title>기술개발팀</Title>
                <Table size="small">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                    {workers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell>{worker.status}</TableCell>
                        <TableCell>{worker.name}</TableCell>
                        <TableCell>{worker.starttime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </React.Fragment>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Noticelist />
              </Paper>
            </Grid>
          </Grid>
    );
  };
  
  export default Dashboard;