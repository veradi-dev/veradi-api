import Editor from "./QuillEditor";
import React, { useState } from "react";
import Title from "../Title";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Noticelist from "./NoticeList";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getTeamCode } from "~/frontend/src/utils";
import { Redirect } from "react-router-dom";
const Noticepatch = ({ NoticeData, user, match, history }) => {
  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    fixedHeight: {
      height: 240
    }
  }));
  const classes = useStyles();
  const [title, settitle] = useState();
  const [desc, setDesc] = useState("");
  const onTitleChange = e => {
    settitle(e.target.value);
  };
  function onEditorChange (value) {
    setDesc(value);
  }

  const handlePatch = e => {
    const data = {
      title: title,
      contents: desc
    };
    const teamdata = {
      title: title,
      contents: desc,
      team: getTeamCode(user.team)
    };
    if (match.params.team == "전체") {
      axios
        .patch(`/api/v1/notice/${match.params.id}/`, data, {
          headers: { Authorization: "Token " + `${user.token}` }
        })
        .then(res => {
          console.log(res);
          <Redirect
            to={`/notice/전체/${match.params.pageNumber}/${match.params.id}`}
          ></Redirect>;
        })
        .catch(err => {
          const status = err?.response?.status;
          console.log(err);
          if (status === undefined) {
            console.dir(
              "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
                JSON.stringify(err)
            );
          } else if (status === 400) {
            alert("");
            console.dir("400에러");
          } else if (status === 500) {
            console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
          } else {
          }
        });
    } else {
      axios
        .patch(`/api/v1/notice/${match.params.id}`, teamdata, {
          headers: { Authorization: "Token " + `${user.token}` }
        })
        .then(res => {
          console.log(res);
          <Redirect
            to={`/notice/${match.params.team}/${match.params.pageNumber}/${match.params.id}`}
          ></Redirect>;
        })
        .catch(err => {
          const status = err?.response?.status;
          console.log(err);
          if (status === undefined) {
            console.dir(
              "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
                JSON.stringify(err)
            );
          } else if (status === 400) {
            alert("");
            console.dir("400에러");
          } else if (status === 500) {
            console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
          } else {
          }
        });
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>{match.params.team} 공지사항</Title>
            <TextField
              id='outlined-full-width'
              label='제목'
              placeholder='제목을 입력하세요'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              defaultValue={NoticeData.title}
              variant='outlined'
              value={title}
              onChange={onTitleChange}
            />
            <Editor
              defaultValue={NoticeData.contents}
              value={desc}
              onChange={onEditorChange}
              NoticeData={NoticeData}
            />
            <Button
              component={Link}
              to={"/Notice"}
              variant='contained'
              color='primary'
              onClick={handlePatch}
            >
              저장하기
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Noticepatch);
