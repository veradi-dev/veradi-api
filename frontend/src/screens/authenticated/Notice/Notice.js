import React, { useState, useEffect, Fragment } from "react";
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
import NoticeDetail from "./NoticeDetail";
import clsx from "clsx";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography
} from "@material-ui/core";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";
import useStyles from "./styles";

const convertTeamName = (user, team, type) => {
  if (type === "code") {
    return team === "전체" ? null : getTeamCode(user.team);
  } else if (type === "string") {
    return team === "전체" ? "전체" : user.team;
  } else if (type === "toggle") {
    if (team === "전체") {
      return user.team;
    } else {
      return "전체";
    }
  }
};

const Notice = ({ user, getNotice, match, location, history }) => {
  const { page = 1, team = "전체" } = useParams();
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [count, setCount] = useState(0);
  const [detailMode, setDetailMode] = useState(false);
  const [detailId, setDetailId] = useState(0);

  const clear = () => {
    setLoading(true);
    setNotices([]);
    setCount(0);
    setDetailMode(false);
    setDetailId(0);
  };

  const dispatch = useDispatch();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const setDetail = id => {
    if (id === 0) {
      setDetailMode(false);
    } else {
      setDetailMode(true);
    }
    setDetailId(id);
  };

  const updateSingleNotice = (id, data) => {
    const { title, contents } = data;

    setNotices(
      notices.map(obj => {
        if (obj.id === id) {
          obj.title = title;
          obj.contents = contents;
          obj.updatedAt = new Date();
        }
        return obj;
      })
    );
  };
  const deleteSingleNotice = id => {
    setDetail(0);
    setNotices(notices.filter(obj => obj.id !== id));
  };

  useEffect(() => {
    let isUnmounted = false;

    setLoading(true);

    const data = {
      team: convertTeamName(user, team, "code"),
      page
    };

    getNotice(data)
      .then(res => {
        if (isUnmounted === false && res.status === 200) {
          setNotices(
            res.data.results.map((obj, index) => ({
              no: parseInt(res.data.count) - index,
              id: obj.id,
              writer: `${obj.writer.last_name}${obj.writer.first_name}`,
              team: obj.team,
              title: obj.title,
              contents: obj.contents,
              createdAt: obj.created_at
            }))
          );
          setCount(parseInt(res.data.count));
        }
      })
      .catch(err => {
        dispatch(alertActions.error("에러 발생"));
        history.goBack();
      })
      .finally(() => {
        if (isUnmounted === false) setLoading(false);
      });
    return () => {
      isUnmounted = true;
      clear();
    };
  }, [page, team]);

  return (
    <>
      <Box flex={1}>
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
          {convertTeamName(user, team, "string")} 공지사항
        </Typography>
        {detailMode === true ? null : (
          <Button disabled={loading} className={classes.link}>
            <Link
              to={`/notice/${convertTeamName(user, team, "toggle")}/${page}`}
              className={classes.link}
            >
              {convertTeamName(user, team, "toggle")} 공지사항 으로 전환
            </Link>
          </Button>
        )}
      </Box>

      <Grid container justify='flex-end'>
        <Grid item>
          {getPosition(user) > 2 && detailMode !== true ? (
            <Link to={`/notice/create`} className={classes.link}>
              <Button
                variant='contained'
                color='primary'
                style={{ marginBottom: 10 }}
              >
                작성하기
              </Button>
            </Link>
          ) : (
            <Fragment />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? (
            <Paper className={fixedHeightPaper}>
              <CircularProgress />
            </Paper>
          ) : detailMode ? (
            <Paper className={classes.paper}>
              <NoticeDetail
                notice={notices.filter(obj => obj.id === detailId)[0]}
                setDetail={setDetail}
                updateSingleNotice={updateSingleNotice}
                deleteSingleNotice={deleteSingleNotice}
              />
            </Paper>
          ) : (
            <Paper className={classes.paper}>
              {" "}
              <NoticeList notices={notices} setDetail={setDetail} />
            </Paper>
          )}
        </Grid>
      </Grid>
      {detailMode ? null : (
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
      )}
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { getNotice })(Notice);
