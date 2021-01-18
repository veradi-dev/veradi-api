import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Noticelist from './Noticelist';
import Noticecreate from './Noticecreate';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Title from '../Title';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const NoticeLayout = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
      }));
      const classes = useStyles();
      const theme = useTheme();
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const handleChangeIndex = (index) => {
        setValue(index);
      };
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Title>공지사항</Title>
          <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="전체" {...a11yProps(0)} />
          <Tab label="지구과학팀" {...a11yProps(1)} />
          <Tab label="생명과학팀" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Noticelist></Noticelist>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Noticelist></Noticelist>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Noticelist></Noticelist>
        </TabPanel>
      </SwipeableViews>
    </div>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  
  export default NoticeLayout;