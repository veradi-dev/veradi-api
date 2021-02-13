import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Noticepatch from "./../screens/authenticated/Notice/Noticepatch";
import axios from "axios";

export default function NoticeDetailPost({
  NoticeData,
  id,
  match,
  user,
  history,
}) {
  const handlePatch = () => {
    setNoticeDetail(false);
  };
  const handleDelete = () => {
    axios
      .delete(`/api/v1/notice/${match.params.id}/`, {
        headers: { Authorization: "Token " + `${user.token}` },
      })
      .then((res) => {
        console.log(res);
        <Redirect to={`/notice/전체/noticelist/1`}></Redirect>;
      })
      .catch((err) => {
        const status = err?.response?.status;
        console.log(err);
        if (status === undefined) {
          console.dir(
            "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
              JSON.stringify(err)
          );
        } else if (status === 400) {
          console.dir("400에러");
        } else if (status === 500) {
          console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
        }
      });
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
    },
  }));
  const classes = useStyles();

  const [NoticeDetail, setNoticeDetail] = useState(true);
  function findnotice(NoticeData, id) {
    for (let i = 0; NoticeData.results[i].id >= id; i++) {
      if (NoticeData.results[i].id == id) {
        return i;
      }
    }
  }
  return (
    <div>
      <Paper className={classes.paper}>
        {NoticeDetail ? (
          <React.Fragment>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Typography
                  align="center"
                  color="inherit"
                  variant="h5"
                  component="div"
                >
                  제목
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  align="left"
                  color="inherit"
                  variant="h5"
                  component="div"
                >
                  {NoticeData.results[findnotice(NoticeData, id)].title}
                </Typography>
              </Grid>
            </Grid>
            <br></br>
            <div className="fixdeletebtn">
              <Button color="primary" variant="contained" onClick={handlePatch}>
                수정하기
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleDelete}
              >
                삭제하기
              </Button>
            </div>
            <Typography
              align="right"
              color="inherit"
              variant="subtitle2"
              component="div"
            >
              {NoticeData.results[findnotice(NoticeData, id)].writer.last_name +
                NoticeData.results[findnotice(NoticeData, id)].writer
                  .first_name}{" "}
              {NoticeData.results[findnotice(NoticeData, id)].created_at.slice(
                0,
                10
              )}
            </Typography>
            <Divider />
            <br></br>
            <br></br>
            <Typography
              align="left"
              color="inherit"
              variant="body1"
              component="div"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    NoticeData.results[findnotice(NoticeData, id)].contents,
                }}
              />
            </Typography>
          </React.Fragment>
        ) : (
          <div>
            <Noticepatch
              NoticeData={NoticeData.results[findnotice(NoticeData, id)]}
              match={match}
            ></Noticepatch>
          </div>
        )}
      </Paper>
    </div>
  );
}
