import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import "./Teamleadertable.css";
import { correctionWorkhour } from "~/frontend/src/redux/workhours/workhoursThunks";
import { toggleMode } from "~frontend/src/utils";
import CorrectionDetailDialog from "./CorrectionDetailDialog";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

function createRow (r) {
  const { id, date, time, mode, reason, workhour, created_at } = r;
  const datetime = new Date(`${date}T${time}`).toLocaleString().slice(0, -3);
  return {
    id,
    username: workhour.user.last_name + workhour.user.first_name,
    datetime,
    date,
    time,
    mode: toggleMode(mode),
    reason,
    workhour,
    created_at: new Date(created_at).toLocaleString().slice(0, -3)
  };
}

function Row (props) {
  const { row, refresh } = props;

  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <CorrectionDetailDialog row={row} refresh={refresh} />
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.username}
        </TableCell>
        <TableCell>{`${row.datetime} ${row.mode}`}</TableCell>
        <TableCell>{row.created_at}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  table: {
    width: "100%"
  }
}));

const WorkhourCorrectionRequestTable = ({ correctionWorkhour }) => {
  const [rows, setRows] = useState([]);
  const [refreshOnChange, setRefreshOnChange] = useState(false);
  const refresh = () => setRefreshOnChange(!refreshOnChange);

  const classes = useStyles();
  useEffect(() => {
    correctionWorkhour(null, "get").then(res => {
      if (res.status === 200) {
        setRows(res.data.map(r => createRow(r)));
      } else {
        setRows([]);
      }
    });
  }, [refreshOnChange]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>신청인</TableCell>
            <TableCell>요청사항</TableCell>
            <TableCell>신청일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.id} row={row} refresh={refresh} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = { correctionWorkhour };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkhourCorrectionRequestTable);
