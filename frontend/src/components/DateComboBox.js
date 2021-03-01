import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 60
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 120
    },
    margin: theme.spacing(1)
  }
}));

export default function DateComboBox ({ date, setDate }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const handleChange = event => {
    const name = event.target.name;
    setDate({
      ...date,
      [name]: parseInt(event.target.value)
    });
  };
  return (
    <>
      <FormControl
        variant='outlined'
        className={classes.formControl}
        size={sm ? "small" : "medium"}
      >
        <InputLabel htmlFor='outlined-year-native-simple'>년도</InputLabel>
        <Select
          native
          value={date.year}
          onChange={handleChange}
          label='year'
          inputProps={{
            name: "year",
            id: "outlined-year-native-simple"
          }}
        >
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
        </Select>
      </FormControl>
      <FormControl
        variant='outlined'
        className={classes.formControl}
        size={sm ? "small" : "medium"}
      >
        <InputLabel htmlFor='name-native-error'>월</InputLabel>
        <Select
          native
          value={date.month}
          onChange={handleChange}
          label='month'
          inputProps={{
            name: "month",
            id: "outlined-age-native-simple"
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
    </>
  );
}
