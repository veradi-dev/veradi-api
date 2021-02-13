import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

export default function NoticeDetailPost({ NoticeData, id }) {
  const handleDelete = () => {};
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
          <Button color="primary" variant="contained">
            수정하기
          </Button>
          <Button color="primary" variant="contained" onClick={handleDelete}>
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
              __html: NoticeData.results[findnotice(NoticeData, id)].contents,
            }}
          />
        </Typography>
      </Paper>
    </div>
  );
}
