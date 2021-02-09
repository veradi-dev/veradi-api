import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import './Noticedetail.css';
import axios from 'axios';
import { connect } from "react-redux";
import NoticeDetailPost from './../../../components/NoticeDetailPost';

import {getTeamCode} from '~/frontend/src/utils';

const Noticedetail = ({match, user}) => {
  const [noticeData, setnoticeData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(match.params.team=='전체'){
    axios.get(`api/v1/notice/`, {'headers':{'Authorization':'Token ' + `${user.token}`}}).then((res) => {
      setnoticeData(res.data);
        setLoading(false);
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
      });}
      else{
        axios.get(`/api/v1/notice?team=${getTeamCode(user.team)}`, {'headers':{'Authorization':'token ' + `${user.token}`}}).then((res) => {
	      setnoticeData(res.data);
        setLoading(false);
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
      }

    
  }, [match.params.team]);
    return (
      <Grid container spacing={3}>
      {loading ? <div> 로딩중입니다.</div>
      : <Grid item xs={12}>
      <NoticeDetailPost noticeData={noticeData} num={match.params.num}/>
  </Grid>} 
    </Grid>
    );
  };
  const mapStateToProps = (state) => ({
    user: state.user,
  });
  export default connect(mapStateToProps)(Noticedetail);