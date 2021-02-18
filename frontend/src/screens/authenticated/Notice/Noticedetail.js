import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./Noticedetail.css";
import { connect, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { getPosition, getTeamCode } from "~/frontend/src/utils";
import clsx from "clsx";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Typography
} from "@material-ui/core";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";
import Editor from "./QuillEditor";
import TextField from "@material-ui/core/TextField";
import { updateNoticeRequest, deleteNoticeRequest } from "../../../api/notices";

const NoticeDetail = ({
  user,
  notice,
  setDetail,
  updateSingleNotice,
  deleteSingleNotice
}) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState(notice.title);
  const [contents, setContents] = useState(notice.contents);
  const dispatch = useDispatch();

  function onEditorChange (value) {
    setContents(value);
  }
  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(4),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      width: "100%",
      height: "80vh",
      overflowX: "scroll"
    },
    fixedHeight: {
      height: 240
    }
  }));
  const classes = useStyles();

  const handleSubmit = () => {
    const data = {
      title,
      contents
    };
    updateNoticeRequest({
      token: user.token,
      id: notice.id,
      data
    })
      .then(res => {
        const { data } = res;
        updateSingleNotice(notice.id, data);
        dispatch(alertActions.success("업데이트 되었습니다."));
      })
      .catch(err => {
        if (err.response.status === 403) {
          dispatch(alertActions.error("권한이 없습니다."));
        } else if (err.ersponse.status === 404) {
          dispatch(alertActions.error("존재하지 않는 게시물입니다."));
        } else if (err.ersponse.status === 400) {
          dispatch(alertActions.error("잘못된 접근입니다."));
        }
      });
    setUpdateMode(false);
  };
  const handleDelete = () => {
    const id = notice.id;
    deleteNoticeRequest({ token: user.token, id })
      .then(res => {
        if (res.status === 204) {
          dispatch(alertActions.success("삭제 되었습니다."));
          deleteSingleNotice(id);
        }
      })
      .catch(err => {
        dispatch(alertActions.error("에러가 발생했습니다."));
        if (err.response.status === 404) {
          dispatch(alertActions.error("이미 삭제된 공지사항입니다."));
          deleteSingleNotice(id);
        }
      });
  };
  return updateMode === false ? (
    <Paper className={classes.paper}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography align='left' variant='h5'>
            {notice.title}
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={() => setUpdateMode(true)}
              >
                수정하기
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    handleDelete();
                  }
                }}
              >
                삭제하기
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={() => setDetail(0)}
              >
                목록
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <br></br>
      <div className='fixdeletebtn'></div>
      <Typography
        align='right'
        color='inherit'
        variant='subtitle2'
        component='div'
      >
        {notice.writer} {notice.createdAt.slice(0, 10)}
      </Typography>
      <Divider />
      <br></br>
      <br></br>
      <Typography align='left' color='inherit' variant='body1' component='div'>
        <div
          dangerouslySetInnerHTML={{
            __html: notice.contents
          }}
        />
      </Typography>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <TextField
            id='outlined-full-width'
            label='제목'
            placeholder='제목을 입력하세요'
            fullWidth
            margin='normal'
            style={{ width: "50vw" }}
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Box>
        <Box>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={() => setUpdateMode(false)}
              >
                취소
              </Button>
            </Grid>
            <Grid item>
              <Button
                color='primary'
                variant='contained'
                onClick={handleSubmit}
              >
                저장
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Editor
        defaultValue={notice.contents}
        value={contents}
        onChange={onEditorChange}
        notice={notice}
      />
    </Paper>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetail);
