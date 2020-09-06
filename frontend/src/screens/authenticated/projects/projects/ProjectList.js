import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import FlexEndContainer from "../../../../components/layout/FlexEndContainer";
import axios from "axios";
import { subjectCodeConverter } from "~/frontend/src/utils/codeConverter";
import { Divider } from "@material-ui/core";

const createRow = (project) => ({
  id: project.id,
  subject: subjectCodeConverter(project.subject.name),
  name: project.name,
  totalDueDate: project.total_due_date,
});

const Row = ({ id, subject, name, totalDueDate }) => {
  const history = useHistory();
  const date = new Date(totalDueDate);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{subject}</TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">
          {date.toLocaleString().slice(0, -3)}
        </TableCell>
        <TableCell align="right">
          <Button
            onClick={() => history.push(`/projects/management/${id}`)}
            size="small"
          >
            자세히
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

function DefaultTable() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/projects/").then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell padding="default">과목</TableCell>
            <TableCell align="right">프로젝트명</TableCell>
            <TableCell align="right">전체 마감 기한</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <Row key={`project${project.id}`} {...createRow(project)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ProjectList = () => {
  return (
    <FlexEndContainer title="프로젝트 조회">
      <DefaultTable />
    </FlexEndContainer>
  );
};

export default ProjectList;
