import Editor from './EditorComponent';
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
const Noticecreate = ({match}) => {
    const { team } = match.params;
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
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
                    />
                <Editor value={desc} onChange={onEditorChange} />
                <Button component={Link} to={'/Notice'} variant="contained" color="primary" onClick={() => alert("저장되었습니다!")}>
                저장하기
                </Button>
                </Paper>
            </Grid>
            </Grid>
          
        </div>
    )
};

export default Noticecreate;