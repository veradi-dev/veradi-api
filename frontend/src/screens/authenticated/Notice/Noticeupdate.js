import React, { useState } from "react";
import Editor from "./QuillEditor";
import Title from "../Title";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Noticelist from "./NoticeList";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getTeamCode } from "~/frontend/src/utils";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const NoticeUpdate = ({ notice, setUpdateMode, setUpdateForm }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const classes = useStyles();
  const onTitleChange = e => {
    setTitle(e.target.value);
  };
  function onEditorChange (value) {
    setDesc(value);
  }
  return;
};

export default NoticeUpdate;
