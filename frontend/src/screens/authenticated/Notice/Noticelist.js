  
import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PaginationItem from "@material-ui/lab/PaginationItem";
import Pagination from "@material-ui/lab/Pagination";

import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Link, useParams} from 'react-router-dom';
import Title from '../Title';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
// Generate Order Data


const USER_PATH = "/notice";
const ROWS_PER_PAGE = 10;

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


const headCells = [
  { id: 'num', numeric: false, disablePadding: true, label: '번호' },
  { id: 'title', numeric: false, disablePadding: false, label: '제목' },
  { id: 'name', numeric: false, disablePadding: false, label: '작성자' },
  { id: 'date', numeric: true, disablePadding: false, label: '작성일' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, numSelected, rowCount, onRequestSort } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));


const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};


//https://medium.com/@ankita.singh170190/material-ui-table-with-pagination-component-9f53a3380245
const Noticelist=({user, label})=> {

  const isSelected = (id) => selected.indexOf(id) !== -1;
const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
const handleClick = (event, id) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => n.id);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};
  
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{label} 공지사항</Title>
      <Link to={`/notice/${label}/create`}>
      <Button>작성하기</Button>
      </Link>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
      <Table className={classes.table} size="small">

      <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
        <TableBody>{rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </React.Fragment>
  );
}

export default Noticelist;