import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import useStyles from "./styles";

//https://medium.com/@ankita.singh170190/material-ui-table-with-pagination-component-9f53a3380245
const NoticeList = ({ notices, setDetail }) => {
  const classes = useStyles();
  const handleClick = id => {
    setDetail(id);
  };
  const NoWrapCell = props => {
    return (
      <TableCell
        {...props}
        style={{ whiteSpace: "nowrap" }}
        className={classes.NoWrapCell}
      />
    );
  };

  return (
    <React.Fragment>
      <Table className={classes.table} size='small'>
        <TableHead>
          <TableRow>
            <NoWrapCell align='center' width='10%'>
              <Typography variant='subtitle2'>번호</Typography>
            </NoWrapCell>
            <NoWrapCell align='center' width='50%'>
              <Typography variant='subtitle2'>제목</Typography>
            </NoWrapCell>
            <NoWrapCell align='center' width='20%'>
              <Typography variant='subtitle2'>작성자</Typography>
            </NoWrapCell>
            <NoWrapCell align='center' width='20%'>
              <Typography variant='subtitle2'>작성일</Typography>
            </NoWrapCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map(notice => {
            return (
              <TableRow key={notice.id} className={classes.row}>
                <TableCell align='center' className={classes.itemCell}>
                  <Button
                    style={{ width: "100%", textAlign: "right" }}
                    onClick={() => handleClick(notice.id)}
                  >
                    {notice.no}
                  </Button>
                </TableCell>
                <TableCell className={classes.itemCell}>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => handleClick(notice.id)}
                  >
                    {notice.title}{" "}
                  </Button>
                </TableCell>
                <TableCell align='center' className={classes.itemCell}>
                  {notice.writer}
                </TableCell>
                <TableCell align='center' className={classes.itemCell}>
                  {notice.createdAt.slice(0, 10)}
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
