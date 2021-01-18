import Editor from './EditorComponent';
import React,{useState} from 'react';
import Title from '../Title';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NoticeLayout from './NoticeLayout';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
                <NoticeLayout></NoticeLayout>
                <Editor value={desc} onChange={onEditorChange} />
                </Paper>
            </Grid>
            </Grid>
          
        </div>
    )
};

export default Noticecreate;