import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
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
import Modal from "@material-ui/core/Modal";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Image from "material-ui-image";
import { subjectCodeConverter } from "~/frontend/src/utils/codeConverter";
import { Button, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  modal: {
    position: "absolute",
    top: "40%",
    left: "40%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

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
  const classes = useStyles();
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
        {row.subject ? (
          <TableCell component="th" scope="row">
            {row.subject}
          </TableCell>
        ) : null}
        {row.unit ? <TableCell align="right">{row.unit}</TableCell> : null}
        {row.title ? <TableCell align="right">{row.title}</TableCell> : null}
        {row.writer ? <TableCell align="right">{row.writer}</TableCell> : null}
        {row.answer ? <TableCell align="right">{row.answer}</TableCell> : null}
        {row.createdAt ? (
          <TableCell align="right">{row.createdAt}</TableCell>
        ) : null}
        {row.group ? <TableCell align="right">{row.group}</TableCell> : null}
        {row.step ? <TableCell align="right">{row.step}</TableCell> : null}
        {row.delete ? <TableCell align="right">{row.delete}</TableCell> : null}
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
                    key={`questionImage${image.history}`}
                    src={image.file}
                    imageStyle={{ width: "60%", height: "inherit" }}
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

export default function ({ projectId, manageMode, title, columns, rows }) {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalBody = <div className={classes.modal}>ddd</div>;
  return (
    <TableContainer component={Paper}>
      {title ? (
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
          {manageMode ? (
            <div>
              <Button variant="contained" onClick={() => handleOpenModal()}>
                <Typography variant="h8">문항 추가</Typography>
              </Button>
              <Modal open={modalOpen} onClose={handleOpenModal}>
                {modalBody}
              </Modal>
            </div>
          ) : null}
        </Toolbar>
      ) : null}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <TableCell
                key={`questionTableHeadKey${column.name}`}
                align={column.align}
              >
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={`questionTableRowKey${row.id}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
