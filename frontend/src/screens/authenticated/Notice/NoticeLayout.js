import React from 'react';
import Noticelist from './Noticelist';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NoticeLayout({user}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
      <Tabs
      variant="fullWidth"
      value={value}
      onChange={handleChange}
      aria-label="nav tabs example"
      >
      <LinkTab label="전체" {...a11yProps(0)} />
      <LinkTab label={user.team} {...a11yProps(1)} />\
      </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Noticelist user={user} label="전체"></Noticelist>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Noticelist user={user} label={user.team}></Noticelist>
      </TabPanel>
    </div>
  );
}