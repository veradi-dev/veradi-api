import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Typography } from "@material-ui/core";

import clsx from "clsx";
const Editor = lazy(() => import("./QuillEditor"));
s;
import { getTeamCode } from "~/frontend/src/utils";
import { createNoticeRequest } from "~/frontend/src/api/notices";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  fixedHeight: {
    height: 240
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
    paddingRight: theme.spacing(3),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
}));

const NoticeCreate = ({ match, user, history }) => {
  const [title, settitle] = useState("");
  const TEAM_CHOICES = [null, user.team];
  const [team, setTeam] = useState(0); // 전체: null, 팀: 해당 팀
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handlesubmit = () => {
    const data = {
      title: title,
      contents: desc,
      team: getTeamCode(TEAM_CHOICES[team])
    };
    createNoticeRequest({ token: user.token, data })
      .then(res => {
        if (res.status === 201) {
          dispatch(alertActions.success("공지사항이 생성되었습니다."));
        }
        history.push(`/notice/${team === 0 ? "전체" : user.team}/1`);
      })
      .catch(err => {
        dispatch(alertActions.success("에러 발생"));
      });
  };
  const onTitleChange = e => {
    settitle(e.target.value);
  };
  const onTeamChange = e => {
    setTeam(parseInt(e.target.value));
  };
  function onEditorChange (value) {
    setDesc(value);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component='h2'
              variant='h5'
              color='primary'
              gutterBottom
            >
              공지사항 등록
            </Typography>
            <RadioGroup
              aria-label='team-selection'
              name='team'
              row
              value={team}
              onChange={onTeamChange}
            >
              <FormLabel className={classes.radioGroup}>팀 선택</FormLabel>
              <FormControlLabel value={0} control={<Radio />} label='전체' />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={`${user.team}`}
              />
            </RadioGroup>
            <TextField
              id='outlined-full-width'
              label='제목'
              placeholder='제목을 입력하세요'
              fullWidth
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
              variant='outlined'
              value={title}
              onChange={onTitleChange}
            />
            <Editor value={desc} onChange={onEditorChange} />
            <Button variant='contained' color='primary' onClick={handlesubmit}>
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
export default connect(mapStateToProps)(NoticeCreate);
