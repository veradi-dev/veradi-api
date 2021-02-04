import React, { useEffect, useState } from "react";
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

  return {
    id,
    username: workhour.user.last_name + workhour.user.first_name,
    date,
    time: time.slice(0, 5),
    mode: toggleMode(mode),
    reason,
    workhour,
    created_at: new Date(created_at).toLocaleString()
  };
}

function Row (props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <CorrectionDetailDialog row={row} />
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.username}
        </TableCell>
        <TableCell>{`${row.date} ${row.time} ${row.mode}`}</TableCell>
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

  const classes = useStyles();

  useEffect(() => {
    correctionWorkhour(null, "get").then(res => {
      setRows(res.data.map(r => createRow(r)));
    });
  }, []);

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
            <Row key={row.id} row={row} />
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
