import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { getNotice } from "~/frontend/src/redux/notice/noticeThunk";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Pagination from "@material-ui/lab/Pagination";
import { getPosition, getTeamCode } from "~/frontend/src/utils";
import NoticeList from "./NoticeList";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography
} from "@material-ui/core";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  fixedHeight: {
    height: 240
  },
  link: {
    textDecoration: "inherit"
  }
}));

const convertTeamName = (user, team, type) => {
  if (type === "code") {
    return team === "전체" ? null : getTeamCode(user.team);
  } else if (type === "string") {
    return team === "전체" ? "전체" : user.team;
  } else if (type === "toggle") {
    if (team === "전체") {
      return user.team;
    } else if (team === user.team) {
      return "전체";
    } else {
      return null;
    }
  }
};

const Notice = ({ user, getNotice, match, location, history }) => {
  const { page = 1, team = "전체" } = useParams();
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [count, setCount] = useState(0);
  const [detailMode, setDetailMode] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(location.pathname);
  useEffect(() => {
    setLoading(true);

    const data = {
      team: convertTeamName(user, team, "code"),
      page
    };

    getNotice(data)
      .then(res => {
        if (res.status === 200) {
          setNotices(
            res.data.results.map((obj, index) => ({
              no: parseInt(res.data.count) - index,
              id: obj.id,
              writer: `${obj.writer.last_name}${obj.writer.first_name}`,
              team: obj.team,
              title: obj.title,
              contents: obj.contents
            }))
          );
          setCount(parseInt(res.data.count));
        }
      })
      .catch(err => {
        dispatch(alertActions.error("에러 발생"));
        console.log(err.response.data);
        history.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, team]);

  return (
    <>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        {convertTeamName(user, team, "string")} 공지사항
      </Typography>
      <Grid container justify='space-between'>
        <Grid item xs={12}>
          <Link
            to={`/notice/${convertTeamName(user, team, "toggle")}/${page}`}
            className={classes.link}
          >
            <Button>{convertTeamName(user, team, "toggle")} 공지사항</Button>
          </Link>
        </Grid>
        <Grid item>
          {getPosition(user) > 2 ? (
            <Link to={`/notice/create`} className={classes.link}>
              <Button>작성하기</Button>
            </Link>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            {loading ? <CircularProgress /> : null}
          </Paper>
        </Grid>
      </Grid>
      <Box
        display='flex'
        justifyContent='flex-end'
        flex={1}
        padding={1}
        paddingRight={10}
      >
        <Pagination
          page={Number(page)}
          count={Math.ceil(count / 20)}
          shape='rounded'
          color='primary'
          showFirstButton
          showLastButton
          boundaryCount={2}
          renderItem={item => (
            <PaginationItem
              type={"start-ellipsis"}
              component={Link}
              selected
              to={`${item.page}`}
              {...item}
            />
          )}
        />
      </Box>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { getNotice })(Notice);
