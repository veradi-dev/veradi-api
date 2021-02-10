import React, { useState, useEffect, useReducer, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
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
import {
  secondsToLocalTimeString,
  toggleMode,
  craeteUniqueId,
  descDateTimeSort,
  validateDateString,
  validateTimeString,
  calcStartDate,
  calcEndDate,
  setStatus,
  printTotal
} from "~/frontend/src/utils";
import MenuItem from "@material-ui/core/MenuItem";
import "./table.css";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";
import { correctionWorkhour } from "~/frontend/src/redux/workhours/workhoursThunks";

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

function init (row) {
  if (row === undefined) throw Error;
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
            return payload;
          } else {
            return obj;
          }
        })
        .sort(descDateTimeSort);
      return state;
    case "DELETE":
      return state.filter(obj => obj.id !== payload.id);
    case "RESET":
      return init(action.payload);
    default:
      return state;
  }
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

function CorrectionDetailDialog ({ row, correctionWorkhour, refresh }) {
  const [open, setOpen] = useState(false);
  const reduxDispatch = useDispatch();

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
  const handleUpdate = useCallback(
    form => {
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

      if (updateForm.filter(obj => obj.id === payload.id).length === 0) {
        setUpdateForm([...updateForm, payload]);
      } else {
        setUpdateForm(
          updateForm.map(obj => {
            if (obj.id === payload.id) {
              return payload;
            } else {
              return obj;
            }
          })
        );
      }
      clear();
    },
    [updateForm]
  );
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

  // 백엔드로 데이터 post
  const handleSubmit = approve => {
    const status = setStatus(enterLogs);
    if (approve === true && status !== 1) {
      // error 메시지 표시
      reduxDispatch(
        alertActions.error("변경 후, 정상적인 출입기록이 아닙니다.")
      );
      return;
    }
    if (
      window.confirm("추후 수정은 불가능 합니다.\n정말 진행하시겠습니까?") ===
      false
    ) {
      return;
    }
    const data = {
      id: row.id,
      approve,
      workhour: {
        id: row.workhour.id,
        enter_logs: updateForm
      }
    };
    correctionWorkhour(data, "patch").finally(() => refresh());
    handleClose();
  };

  // Dialog 닫을 때, 정리 함수들
  const handleReset = row => {
    dispatch({ type: "RESET", payload: row });
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    clear();
    handleReset(row);
    setOpen(false);
  };

  // CSS
  const classes = useStyles();
  useEffect(() => {
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
                      : row.workhour.message}
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
            <Button
              onClick={() => handleSubmit(true)}
              variant='contained'
              color='primary'
            >
              승인
            </Button>
            <Button
              onClick={() => handleSubmit(false)}
              variant='contained'
              color='secondary'
            >
              거절
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, { correctionWorkhour })(
  CorrectionDetailDialog
);
