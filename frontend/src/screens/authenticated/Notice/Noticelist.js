  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PaginationItem from "@material-ui/lab/PaginationItem";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import Title from '../Title';
// Generate Order Data
function createData(id, title, name, date) {
  return {id, title, name, date};
};
const rows = [
  createData('1', '제목 테스트입니다', '조은학', '20200501'),
  createData('2', '제목 테스트입니다', '조은학', '20200501'),
  createData('3', '제목 테스트입니다', '조은학', '20200501'),
  createData('4', '제목 테스트입니다', '조은학', '20200501'),
  createData('5', '제목 테스트입니다', '조은학', '20200501'),
  createData('6', '제목 테스트입니다', '조은학', '20200501'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 300,
  },
}));

//https://medium.com/@ankita.singh170190/material-ui-table-with-pagination-component-9f53a3380245
export default function Noticelist({label}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{label} 공지사항</Title>
      <Link to={`/noticecreate/${label}`} label="전체">
      <Button>작성하기</Button>
      </Link>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
		  	    <TableCell align="center" width="10%">
            <Typography variant="subtitle2">번호</Typography>
              </TableCell>
            <TableCell align="center" width="50%" >제목</TableCell>
            <TableCell align="center" width="20%" >작성자</TableCell>
            <TableCell align="center" width="20%" >작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" width="10%">{row.id}</TableCell>
              <TableCell width="50%">{row.title}</TableCell>
              <TableCell align="center" width="20%">{row.name}</TableCell>
              <TableCell align="center" width="20%">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}