import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import Title from "../Title";
import { getPosition } from "~/frontend/src/utils";
import { connect } from "react-redux";
import { getTeamCode } from "~/frontend/src/utils";
import Noticedetail from "./NoticeDetail";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 300
  }
}));

//https://medium.com/@ankita.singh170190/material-ui-table-with-pagination-component-9f53a3380245
const NoticeList = ({ user, match, team }) => {
  const [NoticeData, setNoticeData] = useState([]);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Table className={classes.table} size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center' width='10%'>
              <Typography component={"span"} variant='subtitle2'>
                번호
              </Typography>
            </TableCell>
            <TableCell align='center' width='50%'>
              제목
            </TableCell>
            <TableCell align='center' width='20%'>
              작성자
            </TableCell>
            <TableCell align='center' width='20%'>
              작성일
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {NoticeData.results.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell
                  component={Link}
                  to={`/notice/${match.params.team}/${pageNumber}/${row.id}`}
                  style={{ textDecoration: "none" }}
                  align='center'
                  width='10%'
                >
                  {row.id}
                </TableCell>
                <TableCell
                  component={Link}
                  to={`/notice/${match.params.team}/${pageNumber}/${row.id}`}
                  style={{ textDecoration: "none" }}
                  width='50%'
                >
                  {row.title}
                </TableCell>
                <TableCell align='center' width='20%'>
                  {row.writer.last_name + row.writer.first_name}
                </TableCell>
                <TableCell align='center' width='20%'>
                  {row.created_at.slice(0, 10)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(NoticeList);
