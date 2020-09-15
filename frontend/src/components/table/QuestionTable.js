import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Image from "material-ui-image";
import { subjectCodeConverter } from "~/frontend/src/utils/codeConverter";
import { Divider } from "@material-ui/core";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export const createData = (questions) => {
  let rows = [];
  questions.map((question) => {
    const id = question.id;
    const subject = subjectCodeConverter(question.unit.subject);
    const unit = question.unit.name;
    const title = question.name;
    const firstHistory = question.histories[0];
    const lastHistory = question.histories[question.histories.length - 1];
    const writer = `${firstHistory.writer.last_name}${firstHistory.writer.first_name}`;
    const group = question.group;
    const images = lastHistory.images;
    const createAt = new Date(question.created_at);
    rows.push({
      id,
      subject,
      unit,
      title,
      writer,
      createdAt: createAt.toLocaleDateString("zh-Hans-CN"),
      group,
      images,
      firstHistory,
      lastHistory,
    });
  });
  return rows;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.subject}
        </TableCell>
        <TableCell align="right">{row.unit}</TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.writer}</TableCell>
        <TableCell align="right">{row.createdAt}</TableCell>
        <TableCell align="right">{row.group}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                미리보기
              </Typography>
              {row.images.map((image) => (
                <React.Fragment>
                  <Image
                    src={image.file}
                    imageStyle={{ width: "40%", height: "inherit" }}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ columns, rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <TableCell key={column.name} align={column.align}>
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={`question${row.id}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
