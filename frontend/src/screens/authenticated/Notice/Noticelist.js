  
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
import Box from '@material-ui/core/Box';
import {Link, useParams} from 'react-router-dom';
import Title from '../Title';
// Generate Order Data
function createData(id, title, name, date) {
  return {id, title, name, date};
};

const USER_PATH = "/notice";
const ROWS_PER_PAGE = 10;


const rows = [
  createData('1', '제목 테스트입니다', '조은학', '20200501'),
  createData('2', '제목 테스트입니다', '조은학', '20200501'),
  createData('3', '제목 테스트입니다', '조은학', '20200501'),
  createData('4', '제목 테스트입니다', '조은학', '20200501'),
  createData('5', '제목 테스트입니다', '조은학', '20200501'),
  createData('6', '제목 테스트입니다', '조은학', '20200501'),
  createData('7', '제목 테스트입니다', '조은학', '20200501'),
  createData('8', '제목 테스트입니다', '조은학', '20200501'),
  createData('9', '제목 테스트입니다', '조은학', '20200501'),
  createData('10', '제목 테스트입니다', '조은학', '20200501'),
  createData('11', '제목 테스트입니다', '조은학', '20200501'),
  createData('12', '제목 테스트입니다', '조은학', '20200501'),
  createData('13', '제목 테스트입니다', '조은학', '20200501'),
  createData('14', '제목 테스트입니다', '조은학', '20200501'),
  createData('15', '제목 테스트입니다', '조은학', '20200501'),
  createData('16', '제목 테스트입니다', '조은학', '20200501'),
  createData('17', '제목 테스트입니다', '조은학', '20200501'),
  createData('18', '제목 테스트입니다', '조은학', '20200501'),
  createData('19', '제목 테스트입니다', '조은학', '20200501'),
  createData('20', '제목 테스트입니다', '조은학', '20200501'),
  createData('21', '제목 테스트입니다', '조은학', '20200501'),
  createData('22', '제목 테스트입니다', '조은학', '20200501'),
  createData('23', '제목 테스트입니다', '조은학', '20200501'),
  createData('24', '제목 테스트입니다', '조은학', '20200501'),

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
const Noticelist=({label})=> {
  const classes = useStyles();
  const { pageNumber = 1 } = useParams();
  return (
    <React.Fragment>
      <Title>{label} 공지사항</Title>
      <Link to={`/noticecreate/${label}`}>
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
        {(ROWS_PER_PAGE > 0 ? rows.slice((Number(pageNumber) - 1) * ROWS_PER_PAGE,(Number(pageNumber) - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE,):rows).map(row => {
          return (
            <TableRow key={row.id}>
              <TableCell align="center" width="10%">{row.id}</TableCell>
              <TableCell width="50%">{row.title}</TableCell>
              <TableCell align="center" width="20%">{row.name}</TableCell>
              <TableCell align="center" width="20%">{row.date}</TableCell>
            </TableRow>);})}
        </TableBody>
      </Table>

      <Box
          display="flex"
          justifyContent="flex-end"
          flex={1}
          padding={1}
          paddingRight={10}
        >
          <Pagination
            page={Number(pageNumber)}
            count={Math.ceil(rows.length / ROWS_PER_PAGE)}
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
            boundaryCount={2}
            renderItem={(item) => (
              <PaginationItem
              type={"start-ellipsis"}
                component={Link}
                selected
                to={`${USER_PATH}/${item.page}`}
                {...item}
              />
            )}
          />
        </Box>
    </React.Fragment>
  );
}

export default Noticelist;