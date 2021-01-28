import Editor from './QuillEditor';
import React,{useState} from 'react';
import Title from '../Title';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Noticelist from './Noticelist';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from "react-redux";
const Noticecreate = ({match, user}) => {
    const { team } = match.params;
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value);
    }
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
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
      const handlesubmit=(e)=>{
        const data = {
            "title":title,
            "contents":desc
        };
    axios.post(`/api/v1/notice/`, data, {'headers':{'Authorization':'Token ' + `${user.token}`}})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
        const status = err?.response?.status;
        console.log(err);
        if (status === undefined) {
            console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
        }
        else if (status === 400) {
            alert("");
            console.dir("400에러");
        }
        else if (status === 500) {
            console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
        }
        else{
            history.push('/notice/전체/noticelist/1')
        }
        }
        );
}

const [title, settitle] = useState();
const onTitleChange =(e)=>{
    settitle(e.target.value);
}
    return (
        <div>      
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Title>{team} 공지사항</Title>
                <TextField
                    id="outlined-full-width"
                    label="제목"
                    placeholder="제목을 입력하세요"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={title}
                    onChange={onTitleChange}
                    />
                <Editor value={desc} onChange={onEditorChange} />
                <Button component={Link} to={'/Notice'} variant="contained" color="primary" onClick={handlesubmit}>
                저장하기
                </Button>
                </Paper>
            </Grid>
            </Grid>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user,
  });
  export default connect(mapStateToProps)(Noticecreate);