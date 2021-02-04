import React, { useState } from "react";
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
import "./Teamleadertable.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Container, Grid } from "@material-ui/core";

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

export default function CorrectionDetailDialog ({ row }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

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
          <TableContainer className={clsx(classes.endOfBox)}>
            <Table size='small' aria-label='enterlogs'>
              <TableHead>
                <TableRow>
                  <TableCell>일자</TableCell>
                  <TableCell>시각</TableCell>
                  <TableCell align='right'>유형</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.workhour.enter_logs.map(enter_log => (
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
                  <Grid item xs={6}>
                    출근 시각
                  </Grid>
                  <Grid item xs={6}>
                    12:00
                  </Grid>
                  <Grid item xs={6}>
                    퇴근 시각
                  </Grid>
                  <Grid item xs={6}>
                    20:00
                  </Grid>
                  <Grid item xs={6}>
                    총 근무 시간
                  </Grid>
                  <Grid item xs={6}>
                    8:00
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
                  <Grid item xs={6}>
                    출근 시각
                  </Grid>
                  <Grid item xs={6}>
                    12:00
                  </Grid>
                  <Grid item xs={6}>
                    퇴근 시각
                  </Grid>
                  <Grid item xs={6}>
                    20:00
                  </Grid>
                  <Grid item xs={6}>
                    총 근무 시간
                  </Grid>
                  <Grid item xs={6}>
                    8:00
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
