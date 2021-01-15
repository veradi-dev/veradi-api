import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>한상수 님의 1월 총 근무 시간</Title>
      <Typography component="p" variant="h4">
        111시간 11분
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        입니다
      </Typography>
    </React.Fragment>
  );
}