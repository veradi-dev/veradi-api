import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import './Teamleadertable.css';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id, name, strdate, applydate) {
  return {
    id,
    name,
    strdate,
    applydate,
    applydetail: [
      { date: '2021-01-05', starttime: '12:30', endtime: '15:30' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.strdate}</TableCell>
        <TableCell align="right">{row.applydate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                상세내용
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>출근시간</TableCell>
                    <TableCell>퇴근시간</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.applydetail.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.starttime}</TableCell>
                      <TableCell align="right">{historyRow.endtime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="btn-grid">
              <span className="allowbtn">
        <Button color="primary" variant="contained">승인</Button>
        </span>
        <span className="allowbtn">
        <Button color="secondary" variant="contained">거절</Button>
        </span>
        </div>
            </Box>
            
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1, '조은학', '01/22', '01/23'),
  createData(2, '조은학', '01/22', '01/23'),
  createData(3, '조은학', '01/22', '01/23'),
  createData(4, '조은학', '01/22', '01/23'),
];

export default function CollapsibleTable() {
  const useStyles = makeStyles((theme) => ({
    table: {
      width: '100%',
    },
}));
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>신청자</TableCell>
            <TableCell>이상한 날짜</TableCell>
            <TableCell>신청일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
