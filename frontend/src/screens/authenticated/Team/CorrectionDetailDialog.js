import React, { useState, useEffect, useReducer, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { green } from "@material-ui/core/colors";
import "./Teamleadertable.css";
import { makeStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss";
import clsx from "clsx";
import { Container, formatMs, Grid, TextField } from "@material-ui/core";
import { secondsToLocalTimeString, toggleMode } from "~/frontend/src/utils";
import MenuItem from "@material-ui/core/MenuItem";
import "./table.css";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  endOfBox: {
    paddingBottom: "30px"
  }
}));

const descDateTimeSort = (a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`);
};

const craeteUniqueId = list => {
  let id = parseInt(Math.random() * 10000000);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      i = 0;
      id = parseInt(Math.random() * 10000000);
    }
  }
  return id;
};

function init (row) {
  console.log("리듀서 초기화중...");
  console.log("받은 데이터:");
  console.log(row);
  if (row === undefined) throw Error;
  console.log("정상적인 데이터가 전달되었습니다.");
  return row.workhour.enter_logs.map(enter_log => ({
    id: enter_log.id,
    date: enter_log.date,
    time: enter_log.time,
    mode: enter_log.mode
  }));
}

function reducer (state, action) {
  //         [
  //             {
  //                 id,
  //                 mode,
  //                 name,
  //                 time
  //             }, ...
  //         ]
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload].sort(descDateTimeSort);
    case "UPDATE":
      state = state
        .map(obj => {
          if (obj.id === payload.id) {
            console.log(`기존 obj: ${obj.time}`);
            console.log(`수정 payload: ${payload.time}`);
            return payload;
          } else {
            return obj;
          }
        })
        .sort(descDateTimeSort);
      console.log(state);
      return state;
    case "DELETE":
      return state.filter(obj => obj.id !== payload.id);
    case "RESET":
      return init(action.payload);
    default:
      return state;
  }
}
function validateDateString (dateString) {
  return !isNaN(Date.parse(dateString));
}
function validateTimeString (timeString) {
  return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(timeString);
}

const InputRow = ({ form, handleFormChange, handleSubmit, clear, mode }) => {
  // form, handleFormChange, clear 는 parent Component 의 해당 함수들을 전달해주면 된다.
  // handleSubmit 의 경우, dispatch Thunk 함수를 넣어주면 된다.
  // add 의 경우 => handleAdd, update 의 경우 => handleUpdate ...
  let actionText = mode === "update" ? "수정" : "생성";
  return (
    <TableRow>
      <TableCell>
        <TextField
          id='date'
          label='출입 날짜'
          type='date'
          InputLabelProps={{
            shrink: true
          }}
          name='date'
          value={form.date.value}
          error={form.date.error}
          onChange={handleFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          type='time'
          label='출입 시각'
          InputLabelProps={{
            shrink: true
          }}
          name='time'
          value={form.time.value}
          error={form.time.error}
          onChange={handleFormChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          id='enterlog_select_mod'
          select
          label='유형'
          name='mode'
          value={form.mode.value}
          onChange={handleFormChange}
          error={form.mode.error}
        >
          <MenuItem key='cddms1' value={1}>
            출근
          </MenuItem>
          <MenuItem key='cddms2' value={2}>
            퇴근
          </MenuItem>
          <MenuItem key='cddms3' value={3}>
            출입
          </MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => handleSubmit(form)}
          disabled={
            form.date.error === true ||
            form.time.error === true ||
            form.mode.error === true
          }
        >
          {actionText}
        </Button>
        <Button onClick={() => clear()}>취소</Button>
      </TableCell>
    </TableRow>
  );
};

function calcStartDate (enter_logs) {
  //enter log 중 가장 과거 객체의 datetime을 가져온다. enter log 는 이미 정렬된 상태.
  // mode 1이 있으면 가장 과거의 1을 가져온다.
  let enterLog = Object.assign([], enter_logs).sort(descDateTimeSort);
  for (let enter_log of enterLog) {
    if (enter_log.mode == 1) {
      return new Date(`${enter_log.date}T${enter_log.time}`);
    }
  }
  return new Date(`${enter_logs[0].date}T${enter_logs[0].time}`);
}

function calcEndDate (enter_logs) {
  //enter log 중 가장 최근 객체의 datetime을 가져온다. enter log 는 이미 정렬된 상태.
  // mode 2이 있으면 가장 최근의 2을 가져온다.
  let enterLog = Object.assign([], enter_logs).reverse();
  for (let enter_log of enterLog) {
    if (enter_log.mode == 2) {
      return new Date(`${enter_log.date}T${enter_log.time}`);
    }
  }
  return new Date(`${enter_logs[0].date}T${enter_logs[0].time}`);
}

function printTotal (enter_logs) {
  // a, b 는 각각 Date object 들이다.
  const start = calcStartDate(enter_logs);
  const end = calcEndDate(enter_logs);
  let total = Math.abs(end - start);
  return secondsToLocalTimeString(total / 1000);
}

export default function CorrectionDetailDialog ({ row }) {
  const [open, setOpen] = useState(false);

  // 현재 모드 (읽기 / 생성 / 수정 / 삭제)
  const modeList = ["read", "add", "update"];
  const [mode, setMode] = useState(modeList[0]);

  // form 은 현재 수정하고 있는 객체의 데이터를 임시저장하는 용도이다.
  const [form, setForm] = useState({
    id: null,
    date: {
      value: "",
      error: true
    },
    time: {
      value: "",
      error: true
    },
    mode: {
      value: 3,
      error: false
    }
  });

  const handleFormChange = e => {
    let error = false;
    if (
      (e.target.name === "date" && !validateDateString(e.target.value)) ||
      (e.target.name === "time" && !validateTimeString(e.target.value))
    ) {
      error = true;
    }
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, error }
    });
  };

  // updateForm 은 추후 백앤드로 보낼 데이터를 저장한다.
  const [updateForm, setUpdateForm] = useState([]);

  // reducer로 enter_logs 를 관리한다.
  const [enterLogs, dispatch] = useReducer(reducer, row, init);
  const handleAdd = useCallback(form => {
    const id = craeteUniqueId(enterLogs);
    const payload = {
      id,
      date: form.date.value,
      time: form.time.value,
      mode: form.mode.value, // 숫자,
      type: "add"
    };
    dispatch({
      type: "ADD",
      payload
    });
    setUpdateForm([...updateForm, payload]);
    clear();
  }, []);
  const handleUpdate = useCallback(form => {
    const payload = {
      id: form.id,
      date: form.date.value,
      time: form.time.value,
      mode: form.mode.value, // 숫자
      type: "update"
    };
    dispatch({
      type: "UPDATE",
      payload
    });
    setUpdateForm(
      updateForm.map(obj => {
        if (obj.id === payload.id) {
          return payload;
        } else {
          return obj;
        }
      })
    );
    clear();
  }, []);

  const handleDelete = useCallback(id => {
    dispatch({
      type: "DELETE",
      payload: {
        id
      }
    });
    setUpdateForm(updateForm.filter(obj => obj.id !== id));
    clear();
  }, []);

  // update
  const startUpdate = enter_log => {
    setMode(modeList[2]);
    setForm({
      id: enter_log.id,
      date: { value: enter_log.date, error: false },
      time: { value: enter_log.time.slice(0, 5), error: false },
      mode: { value: enter_log.mode, error: false }
    });
  };

  // form 제출 후 정리 함수
  const clear = () => {
    setMode(modeList[0]);
    setForm({
      id: null,
      date: {
        value: "",
        error: true
      },
      time: {
        value: "",
        error: true
      },
      mode: {
        value: 3,
        error: false
      }
    });
  };
  const handleReset = row => {
    dispatch({ type: "RESET", payload: row });
  };

  // Dialog 개폐 함수
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    clear();
    handleReset(row);
    setOpen(false);
  };

  const classes = useStyles();
  useEffect(() => {
    // CSS
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <>
      <Button
        variant='outlined'
        size='small'
        color='primary'
        onClick={handleClickOpen}
      >
        <Typography variant='caption'>상세사항</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth={true}
      >
        <DialogContent>
          <Typography variant='h6' gutterBottom component='div'>
            {row.username}의 해당일자 출입기록
          </Typography>
          {mode === modeList[0] ? (
            <Container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                paddingLeft: 0
              }}
            >
              <IconButton aria-label='add' onClick={() => setMode(modeList[1])}>
                <Icon
                  className='fa fa-plus-circle'
                  style={{ color: green[500] }}
                />
              </IconButton>
              <Typography>새 기록 생성</Typography>
            </Container>
          ) : null}
          <TableContainer className={clsx(classes.endOfBox)}>
            <Table aria-label='enterlogs'>
              <TableHead>
                <TableRow>
                  <TableCell>일자</TableCell>
                  <TableCell>시각</TableCell>
                  <TableCell>유형</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {mode === modeList[1] ? (
                  <InputRow
                    key={`CreateInputRow`}
                    form={form}
                    handleFormChange={handleFormChange}
                    handleSubmit={handleAdd}
                    clear={clear}
                    mode={modeList[1]}
                  />
                ) : null}
                {enterLogs.map((enter_log, index) => {
                  if (mode === modeList[2] && enter_log.id === form.id) {
                    return (
                      <InputRow
                        key={`InputRow${enter_log.id}`}
                        form={form}
                        handleFormChange={handleFormChange}
                        handleSubmit={handleUpdate}
                        clear={clear}
                        mode={modeList[2]}
                      />
                    );
                  } else {
                    return (
                      <TableRow key={`dialog${enter_log.time}${index}`}>
                        <TableCell>{enter_log.date}</TableCell>
                        <TableCell>{enter_log.time.slice(0, 5)}</TableCell>
                        <TableCell>
                          {enter_log.mode === 1
                            ? "출근"
                            : enter_log.mode === 2
                            ? "퇴근"
                            : "출입"}
                        </TableCell>
                        {mode !== modeList[1] && mode !== modeList[2] ? (
                          <TableCell align='right'>
                            <Button onClick={() => startUpdate(enter_log)}>
                              수정
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell />
                        )}
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant='h6' gutterBottom component='div'>
            요청사항
          </Typography>
          <Typography className={clsx(classes.endOfBox)}>
            {`${row.date} ${row.time} ${row.mode}`}
          </Typography>
          <Grid container spacing={1} className={clsx(classes.endOfBox)}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Paper className={clsx(classes.paper)}>
                <Typography
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}
                >
                  변경 전
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    출근 시각
                    <br />
                    {new Date(row.workhour.start).toLocaleString()}
                  </Grid>
                  <Grid item xs={12}>
                    퇴근 시각
                    <br />
                    {new Date(row.workhour.end).toLocaleString()}
                  </Grid>
                  <Grid item xs={12}>
                    총 근무 시간
                    <br />
                    {row.workhour.status === 1
                      ? secondsToLocalTimeString(row.workhour.total)
                      : workhour.message}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                <Typography
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}
                >
                  변경 후
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    출근 시각
                    <br />
                    {calcStartDate(enterLogs).toLocaleString()}
                  </Grid>
                  <Grid item xs={12}>
                    퇴근 시각
                    <br />
                    {calcEndDate(enterLogs).toLocaleString()}
                  </Grid>
                  <Grid item xs={12}>
                    총 근무 시간
                    <br />
                    {printTotal(enterLogs)}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Typography variant='h6' gutterBottom component='div'>
            사유
          </Typography>
          <Typography className={clsx(classes.endOfBox)}>
            {row.reason}
          </Typography>
          <DialogActions>
            <Button onClick={handleClose} variant='contained' color='primary'>
              승인
            </Button>
            <Button onClick={handleClose} variant='contained' color='secondary'>
              거절
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
