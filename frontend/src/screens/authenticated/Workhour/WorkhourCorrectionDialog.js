import React from "react";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { correctionWorkhour } from "~/frontend/src/redux/workhours/workhoursThunks";
import { alertActions } from "../../../redux/alert/alertSlice";

const modes = [
  {
    value: 1,
    label: "출근"
  },
  {
    value: 2,
    label: "퇴근"
  },
  {
    value: 3,
    label: "출입"
  }
];

const useStyles = makeStyles(theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column"
  }
}));

const WorkhourCorrectionDialog = ({ workhour, correctionWorkhour }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const initialForm = {
    workhour: { id: workhour.id },
    datetime: workhour.start.slice(0, 16),
    mode: 3,
    reason: ""
  };
  const [form, setForm] = React.useState(initialForm);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (form.reason === "") {
      dispatch(alertActions.error("사유를 입력해주세요."));
      return;
    }
    correctionWorkhour(form, "post");
    setForm(initialForm);
    setOpen(false);
  };
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Button
        variant='outlined'
        size='small'
        color='primary'
        onClick={handleClickOpen}
      >
        <Typography variant='caption'>이의신청</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>근무시간 이의신청</DialogTitle>
        <DialogContent>
          <Typography variant='h6' component='div'>
            출입 이력
          </Typography>
          <Table size='small' aria-label='enterlogs'>
            <TableHead>
              <TableRow>
                <TableCell>일자</TableCell>
                <TableCell>시각</TableCell>
                <TableCell align='right'>유형</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workhour.enter_logs.map(enter_log => (
                <TableRow key={`dialog${enter_log.time}`}>
                  <TableCell>{enter_log.date}</TableCell>
                  <TableCell>{enter_log.time.slice(0, 5)}</TableCell>
                  <TableCell align='right'>
                    {enter_log.mode === 1
                      ? "출근"
                      : enter_log.mode === 2
                      ? "퇴근"
                      : "출입"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogContentText>
            정정할 날짜, 시간, 유형을 선택하고 사유를 작성해주십시오.
          </DialogContentText>
          <form>
            <Container className={classes.formContainer}>
              <TextField
                id='datetime-local'
                label='출입 시각'
                type='datetime-local'
                name='datetime'
                value={form.datetime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id='enterlog_select_mod'
                select
                label='출입 유형'
                name='mode'
                value={form.mode}
                onChange={handleChange}
                helperText='출입 유형을 선택해주세요.'
              >
                {modes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='reason-multiline'
                multiline
                rows={10}
                placeholder='사유를 입력하세요.'
                variant='outlined'
                name='reason'
                value={form.reason}
                onChange={handleChange}
              />
            </Container>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            취소
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = { correctionWorkhour };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkhourCorrectionDialog);
