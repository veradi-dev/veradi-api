  
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

// Generate Order Data
function createData(id, title, name, date) {
  return {id, title, name, date};
}

const rows = [
  createData('1', '제목 테스트입니다', '조은학', '20200501'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Noticelist() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>공지사항</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
		  	<TableCell>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>글쓴이</TableCell>
            <TableCell>작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
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
  );
}