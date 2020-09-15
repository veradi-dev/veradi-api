import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const setActive = (steps) => {
  let lastCompleted = -1;
  steps.map((step, idx) => {
    if (step.completed === true) {
      lastCompleted = idx;
      step.active = false;
    } else if (idx === lastCompleted + 1) {
      step.active = true;
    } else {
      step.active = false;
    }
  });
};

export default ({ steps }) => {
  const classes = useStyles();
  setActive(steps);
  return (
    <div className={classes.root}>
      <Stepper alternativeLabel>
        {steps.map((step) => (
          <Step key={step.name} completed={step.completed} active={step.active}>
            <StepButton>{step.label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
