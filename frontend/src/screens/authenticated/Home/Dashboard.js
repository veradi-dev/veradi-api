import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Noticelist from "../Notice/Noticelist";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Avatar, Box, Icon, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import { connect } from "react-redux";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import HomeIcon from "@material-ui/icons/Home";
import axios from "axios";
import request, { createHeaders } from "../../../api/base";

const Dashboard = ({ user }) => {
  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    fixedHeight: {
      height: 300
    },
    smallfixedHeight: {
      height: 160,
      marginBottom: 10
    },
    verysmallfixedHeight: {
      height: 130
    },
    avatar: {
      backgroundColor: "#000000",
      height: 30,
      width: 30
    }
  }));

  const [teamMembers, setTeamMembers] = useState([]);

  function createData (id, title, name, date) {
    return { id, title, name, date };
  }

  const rows = [
    createData("1", "제목 테스트입니다", "조은학", "20200501"),
    createData("2", "제목 테스트입니다", "조은학", "20200501"),
    createData("3", "제목 테스트입니다", "조은학", "20200501"),
    createData("4", "제목 테스트입니다", "조은학", "20200501"),
    createData("5", "제목 테스트입니다", "조은학", "20200501"),
    createData("6", "제목 테스트입니다", "조은학", "20200501"),
    createData("7", "제목 테스트입니다", "조은학", "20200501"),
    createData("8", "제목 테스트입니다", "조은학", "20200501"),
    createData("9", "제목 테스트입니다", "조은학", "20200501"),
    createData("10", "제목 테스트입니다", "조은학", "20200501"),
    createData("11", "제목 테스트입니다", "조은학", "20200501"),
    createData("12", "제목 테스트입니다", "조은학", "20200501"),
    createData("13", "제목 테스트입니다", "조은학", "20200501"),
    createData("14", "제목 테스트입니다", "조은학", "20200501"),
    createData("15", "제목 테스트입니다", "조은학", "20200501"),
    createData("16", "제목 테스트입니다", "조은학", "20200501"),
    createData("17", "제목 테스트입니다", "조은학", "20200501"),
    createData("18", "제목 테스트입니다", "조은학", "20200501"),
    createData("19", "제목 테스트입니다", "조은학", "20200501"),
    createData("20", "제목 테스트입니다", "조은학", "20200501"),
    createData("21", "제목 테스트입니다", "조은학", "20200501"),
    createData("22", "제목 테스트입니다", "조은학", "20200501"),
    createData("23", "제목 테스트입니다", "조은학", "20200501"),
    createData("24", "제목 테스트입니다", "조은학", "20200501")
  ];

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const smallfixedHeightPaper = clsx(classes.paper, classes.smallfixedHeight);
  const verysmallfixedHeightPaper = clsx(
    classes.paper,
    classes.verysmallfixedHeight
  );
  useEffect(() => {
    const headers = createHeaders(user.token);
    console.log(headers);
    const res = request("get", "api/v1/workhours/", null, headers, {
      user: user.id
    });
    console.log(res);
  }, []);

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
            <Title>{user.team} 근무현황</Title>
            <Table size='small'>
              <TableHead></TableHead>
              <TableBody>
                {workers.map(worker => (
                  <TableRow key={worker.id}>
                    <TableCell align='center'>
                      {worker.status === "working" ? (
                        <DirectionsRunIcon
                          color='primary'
                          style={{ fontSize: 20 }}
                        />
                      ) : (
                        <HomeIcon color='secondary' style={{ fontSize: 20 }} />
                      )}
                    </TableCell>
                    <TableCell align='center'>{worker.name}</TableCell>
                    <TableCell align='center'>{worker.starttime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <React.Fragment>
            <Title>전체 공지사항</Title>
            <Table className={classes.table} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' width='10%'>
                    <Typography variant='subtitle2'>번호</Typography>
                  </TableCell>
                  <TableCell align='center' width='50%'>
                    제목
                  </TableCell>
                  <TableCell align='center' width='20%'>
                    작성자
                  </TableCell>
                  <TableCell align='center' width='20%'>
                    작성일
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align='center' width='10%'>
                      {row.id}
                    </TableCell>
                    <TableCell width='50%'>{row.title}</TableCell>
                    <TableCell align='center' width='20%'>
                      {row.name}
                    </TableCell>
                    <TableCell align='center' width='20%'>
                      {row.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Dashboard);

//<HomeIcon color="secondary" style={{ fontSize: 20 }}/>
