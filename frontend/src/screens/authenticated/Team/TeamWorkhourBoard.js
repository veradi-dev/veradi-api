import React, { useState, useEffect } from "react";
import DateComboBox from "~/frontend/src/components/DateComboBox";
import { getDate } from "~/frontend/src/utils";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { getTeamStat } from "~/frontend/src/redux/workhours/workhoursThunks";
import { connect } from "react-redux";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const RenderLineChart = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line
        type='monotone'
        dataKey='total'
        stroke='#8884d8'
        displayName='근무시간(분)'
      />
      <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

const useStyles = makeStyles(theme => ({
  centerBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function TeamWorkhourBoard ({ getTeamStat }) {
  const [date, setDate] = useState(getDate());
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([{}]);
  const classes = useStyles();

  useEffect(() => {
    let isUnmount = false;
    getTeamStat(date.year, date.month).then(res => {
      if (isUnmount === false) {
        if (res.status === 200) {
          const { data } = res;
          setData([
            {},
            ...data
              .map(obj => ({
                name: `${obj.name}\n(${obj.code})`,
                total: parseInt(obj.total / 60)
              }))
              .sort((a, b) => b.total - a.total),
            {}
          ]);
        }
        setIsLoading(false);
      }
    });
    return () => {
      isUnmount = true;
    };
  }, []);
  return (
    <>
      <DateComboBox date={date} setDate={setDate} />
      {isLoading ? (
        <Box className={classes.centerBox}>
          <CircularProgress />
        </Box>
      ) : (
        <RenderLineChart data={data} />
      )}
    </>
  );
}

export default connect(() => ({}), { getTeamStat })(TeamWorkhourBoard);
