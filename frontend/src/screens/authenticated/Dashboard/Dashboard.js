import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { Avatar, Box, CircularProgress, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import HomeIcon from "@material-ui/icons/Home";

import useStyles from "./styles";
import { get_team_members } from "../../../api/users/team_management";
import { getMyWorkhours } from "../../../redux/workhours/workhoursThunks";

const Dashboard = ({ user, workhours, getMyWorkhours }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [myWorkHoursInMonth, setMyWorkHoursInMonth] = useState(0);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const [team_member_loading, setTMLoading] = useState(true);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const smallfixedHeightPaper = clsx(classes.paper, classes.smallfixedHeight);
  const verysmallfixedHeightPaper = clsx(
    classes.paper,
    classes.verysmallfixedHeight
  );

  useEffect(() => {
    let isUnmount = false;
    setTMLoading(true);
    get_team_members(user.token)
      .then(res => {
        if (isUnmount === false) {
          setTeamMembers(res.data);
        }
      })
      .finally(() => {
        if (isUnmount === false) {
          setTMLoading(false);
        }
      });
    getMyWorkhours(year, month);
    return () => {
      isUnmount = true;
    };
  }, []);

  useEffect(() => {
    setMyWorkHoursInMonth(
      workhours
        .filter(
          workhour =>
            workhour.user.id === user.id &&
            parseInt(workhour.start.slice(0, 4)) === year &&
            parseInt(workhour.start.slice(5, 7)) === month &&
            workhour.total !== false
        )
        .reduce((total, workhour) => total + workhour.total, 0)
    );
  }, [workhours]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Grid
          container
          direction='column'
          justify='space-evenly'
          alignItems='stretch'
        >
          <Paper className={smallfixedHeightPaper}>
            <Box
              alignItems='center'
              display='flex'
              flexDirection='column'
              p={2}
            >
              <Avatar className={classes.avatar} />
              <Typography
                className={classes.name}
                color='textPrimary'
                variant='h6'
              >
                {user.last_name + user.first_name}
              </Typography>
              <Typography color='textSecondary' variant='h6'>
                {user.team}
              </Typography>
            </Box>
          </Paper>
          <Paper className={verysmallfixedHeightPaper}>
            <Grid container justify='space-between' spacing={3}>
              <Grid item>
                <Typography color='textSecondary' variant='h6'>
                  이번달 근무시간
                </Typography>
                <Typography color='textPrimary' variant='h5'>
                  {parseInt(myWorkHoursInMonth / 3600)}시간{" "}
                  {parseInt((myWorkHoursInMonth % 3600) / 60)}분
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <React.Fragment>
            <Typography
              component='h2'
              variant='h6'
              color='primary'
              gutterBottom
            >
              {user.team} 근무현황
            </Typography>
            {team_member_loading === true ? (
              <Box className={clsx(classes.fullSize, classes.center)}>
                <CircularProgress />
              </Box>
            ) : (
              <Table size='small'>
                <TableHead></TableHead>
                <TableBody>
                  {teamMembers.map(member =>
                    member.isWorking === null ||
                    member.isWorking.complete === true ? (
                      <TableRow key={member.id}>
                        <TableCell align='center'>
                          <HomeIcon
                            color='secondary'
                            style={{ fontSize: 20 }}
                          />
                        </TableCell>
                        <TableCell align='center'>
                          {member.last_name}
                          {member.first_name}
                        </TableCell>
                        <TableCell align='center'>
                          <Typography>출근중이 아닙니다.</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={member.id}>
                        <TableCell align='center'>
                          <DirectionsRunIcon
                            color='primary'
                            style={{ fontSize: 20 }}
                          />
                        </TableCell>
                        <TableCell align='center'>
                          {member.last_name}
                          {member.first_name}
                        </TableCell>
                        <TableCell align='center'>
                          <Typography>
                            {new Date(member.isWorking.start).toLocaleString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}
          </React.Fragment>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  workhours: state.workhours
});

const mapDispatchToProps = { getMyWorkhours };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
