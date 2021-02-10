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
import axios from "axios";
import NoticeLayout from "./NoticeLayout";
import { connect } from "react-redux";
import { getTeamCode } from "~/frontend/src/utils";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 300,
  },
}));

//https://medium.com/@ankita.singh170190/material-ui-table-with-pagination-component-9f53a3380245
const Noticelist = ({ user, match, Team }) => {
  const [rows, setrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const { pageNumber = 1 } = useParams();
  useEffect(() => {
    setLoading(true);
    if (match.params.team == "전체") {
      axios
        .get(`api/v1/notice?page=${pageNumber}`, {
          headers: { Authorization: "Token " + `${user.token}` },
        })
        .then((res) => {
          console.log(res.data);
          setrows(res.data);
          setLoading(false);
        })
        .catch((err) => {
          const status = err?.response?.status;
          if (status === undefined) {
            console.dir(
              "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
                JSON.stringify(err)
            );
          } else if (status === 400) {
            console.dir("400에러");
          } else if (status === 401) {
            console.dir("401에러");
          } else if (status === 500) {
            console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
          }
        });
    } else {
      axios
        .get(
          `/api/v1/notice?team=${getTeamCode(user.team)}&page=${pageNumber}`,
          {
            headers: { Authorization: "token " + `${user.token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          setrows(res.data);
          setLoading(false);
        })
        .catch((err) => {
          const status = err?.response?.status;
          if (status === undefined) {
            console.dir(
              "데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
                JSON.stringify(err)
            );
          } else if (status === 400) {
            console.dir("400에러");
          } else if (status === 401) {
            console.dir("401에러");
          } else if (status === 500) {
            console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
          }
        });
    }
  }, [Team, pageNumber]);

  const USER_PATH = `/notice/${match.params.team}/noticelist`;
  const ROWS_PER_PAGE = 10;

  const classes = useStyles();

  return (
    <React.Fragment>
      {loading ? (
        <div> 로딩중입니다.</div>
      ) : (
        <React.Fragment>
          <Title>{match.params.team} 공지사항</Title>
          <Link to={`/notice/${match.params.team}/create`}>
            {getPosition(user) > 2 ? <Button>작성하기</Button> : <div></div>}
          </Link>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  <Typography component={"span"} variant="subtitle2">
                    번호
                  </Typography>
                </TableCell>
                <TableCell align="center" width="50%">
                  제목
                </TableCell>
                <TableCell align="center" width="20%">
                  작성자
                </TableCell>
                <TableCell align="center" width="20%">
                  작성일
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.results.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell
                      component={Link}
                      to={`/notice/${match.params.team}/${row.id}`}
                      style={{ textDecoration: "none" }}
                      align="center"
                      width="10%"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      component={Link}
                      to={`/notice/${match.params.team}/${row.id}`}
                      style={{ textDecoration: "none" }}
                      width="50%"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.writer.last_name + row.writer.first_name}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.created_at.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                );
              })}
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
              count={Math.ceil(rows.count / ROWS_PER_PAGE)}
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
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(Noticelist);
