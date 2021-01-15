import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Noticelist from './Noticelist';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, title, name, date) {
  return {id, title, name, date};
}

const rows = [
  createData('12/1', '15:30', '16:30'),
  createData('12/2', '12:30', '16:30'),
  createData('12/3', '13:30', '16:30'),
  createData('12/4', '14:30', '16:30'),
];

function preventDefault(event) {
  event.preventDefault();
}


const Workhour = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
        seeMore: {
            marginTop: theme.spacing(3),
          },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
                <React.Fragment>
            <Title>근무시간</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>출근시간</TableCell>
                    <TableCell>퇴근시간</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                더보기
                </Link>
            </div>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default Workhour;