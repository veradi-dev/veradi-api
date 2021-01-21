import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { connect } from "react-redux";
import SearchBar from "material-ui-search-bar";
function createData(id, title, name, date) {
  return {id, title, name, date};
}

const rows = [
  createData('12/1', '15:30', '16:30'),
  createData('12/2', '12:30', '16:30'),
  createData('12/3', '13:30', '16:30'),
  createData('12/4', '14:30', '16:30'),
];

const monthworkhour=
  {
    "avg_per_date": 720, // 단위는 초(seconds)
    "avg_per_person": 10800 // 단위는 초(seconds)
  }
  
const secondtohour=(seconds)=> {
  let hour = parseInt(seconds/3600);
  let min = parseInt((seconds%3600)/60);
  let sec = seconds%60;
  return hour+"시간"+min+"분"
  }
const Workhour = ({user}) => {
  const [Workhours, setWorkhours] = useState([]);

  /*useEffect(() => {
    // console.log(user.token);
    // const headers = {
    //   Authorization: 'Token bee2aa204fa6f7cceaea15c1074eb86fb0e14d6d3a38955d61ffd75c258bf5e6',
    //   'Content-Type': 'application/json'
    //   }
    axios.get(`/api/v1/workhours?user=1&month=1`, {'headers':{'Authorization':'Token ' + `${user.token}`}}).then((res) => {
      setWorkhours(res.data);
      console.log(res.data);
    }).catch((err)=>{
			const status = err?.response?.status;
			if (status === undefined) {
				console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
			}
			else if (status === 400) {
				console.dir("400에러");
			}
			else if (status === 401) {
				console.dir("401에러");
			}
			else if (status === 500) {
				console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
			}
			});
	}, []);*/

    const useStyles = makeStyles((theme) => ({
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
        seeMore: {
            marginTop: theme.spacing(3),
          },
          formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          },
      }));
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
      const [searchname, setsearchname]=useState('');
      const [state, setState] = React.useState({
        year: '2020',
        month: '1',
      });
      const handlesearch = (e) => {
        setsearchname(e.target.value);
      };
      const searchavg = (e) =>{
        e.preventDefault();
        console.log(state);

      }

      const searchteamperson = (searchname) =>{
        console.log(searchname);

      }


      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };
    return (
    <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
                <React.Fragment>
            <Title>{user.last_name+user.first_name}님의 근무시간</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell align="center">날짜</TableCell>
                    <TableCell align="center">출근시간</TableCell>
                    <TableCell align="center">퇴근시간</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item  xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
                <React.Fragment>
            <Title>{user.team} 팀원 근무시간</Title>
            <SearchBar
    value={searchname}
    onChange={handlesearch}
    onRequestSearch={() => searchteamperson(searchname)}
  />
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell align="center">날짜</TableCell>
                    <TableCell align="center">출근시간</TableCell>
                    <TableCell align="center">퇴근시간</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
                <React.Fragment>
            <Title>{user.team} 평균 근무시간</Title>


            <Grid container spacing={1}>
            <Grid item xs={10}>
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-year-native-simple">년도</InputLabel>
        <Select
          native
          value={state.year}
          onChange={handleChange}
          label="year"
          inputProps={{
            name: 'year',
            id: 'outlined-year-native-simple',
          }} >
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
        </Select>
      </FormControl>
      

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="name-native-error">월</InputLabel>
        <Select
          native
          value={state.month}
          onChange={handleChange}
          label="month"
          inputProps={{
            name: 'month',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value={1}>1월</option>
          <option value={2}>2월</option>
          <option value={3}>3월</option>
          <option value={4}>4월</option>
          <option value={5}>5월</option>
          <option value={6}>6월</option>
          <option value={7}>7월</option>
          <option value={8}>8월</option>
          <option value={9}>9월</option>
          <option value={10}>10월</option>
          <option value={11}>11월</option>
          <option value={12}>12월</option>
          </Select>
      </FormControl>
            </Grid>
            <Grid item xs={2}>
            <Button onClick={searchavg} color="primary" variant="contained">검색</Button>
            </Grid>
            </Grid>
        
      
                      <Typography
                        color="textSecondary"
                        variant="h6"
                      >
                        {user.team} 각 개인의 근무시간의 총합의 평균
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                      >
                        {secondtohour(monthworkhour.avg_per_person)}
                      </Typography>
                      
                      <Typography
                        color="textSecondary"
                        variant="h6"
                      >
                        {user.team} 일별 평균
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                      >
                        {secondtohour(monthworkhour.avg_per_date)}
                      </Typography>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>
    );
  };
  

  const mapStateToProps = (state) => ({
    user: state.user,
  });
  export default connect(mapStateToProps)(Workhour);
  /*
  
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                더보기
                </Link>
            </div>
            */

            //https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg



            
            // <Grid container spacing={1}>
            // <Grid item xs={10}>
            // <TextField fullWidth='true' id="outlined-search" label="팀원을 검색하세요" type="search" variant="outlined" size="small"/>
            // </Grid>
            // <Grid item xs={2}>
            // <Button fullWidth='true' onClick={searchteamperson} color="primary" variant="contained">검색</Button>
            // </Grid>
            // </Grid>