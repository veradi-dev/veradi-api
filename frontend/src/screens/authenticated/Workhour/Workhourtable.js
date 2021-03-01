import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./Workhourtable.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: "100%"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  ItemCell: {
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "nowrap"
    }
  },
  HeadCell: {
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "nowrap"
    }
  }
}));

function EnhancedTableHead (props) {
  const { classes, headCells } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            className={classes.HeadCell}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Row = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {[row.date, row.start, row.end, row.total, row.status(), row.btn()].map(
          (item, index) => (
            <TableCell
              key={`${index}-workhourcell`}
              className={classes.ItemCell}
            >
              {item}
            </TableCell>
          )
        )}
      </TableRow>
      {open ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
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
                    {row.enter_logs.map(enter_log => (
                      <TableRow key={enter_log.time}>
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
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default function EnhancedTable ({ rows, headCells }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            aria-label='enhanced table'
          >
            <EnhancedTableHead classes={classes} headCells={headCells} />
            <TableBody>
              {rows ? (
                rows.map(row => <Row key={row.id} row={row} />)
              ) : (
                <React.Fragment />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
