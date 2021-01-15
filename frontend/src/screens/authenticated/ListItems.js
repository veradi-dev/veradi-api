import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import {Link} from 'react-router-dom';
export const mainListItems = (
  <div>
    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="대시보드" />
    </ListItem>
    </Link>
    <Link to="/notice" style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="공지사항" />
    </ListItem>
    </Link>
    <Link to="/workhour" style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="근무시간 조회" />
    </ListItem>
    </Link>
    <Link to="/team" style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="팀 관리" />
    </ListItem>
    </Link>
    <Link to="/room" style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="회의실 예약" />
    </ListItem>
    </Link>
    <Link to="/project" style={{ textDecoration: 'none', color: 'black' }}>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="프로젝트" />
    </ListItem>
    </Link>
  </div>
);
