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

// const data = [
//   {},
//   { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
//   { name: "Page C", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Page D", uv: 300, pv: 2400, amt: 2400 },
//   { name: "Page E", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Page F", uv: 300, pv: 2400, amt: 2400 }
// ];

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

function TeamWorkhourBoard ({ getTeamStat }) {
  const [date, setDate] = useState(getDate());
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getTeamStat(date.year, date.month).then(res => {
      console.log(res);
      if (res.status === 200) {
        const { data } = res;
        setData([
          {},
          ...data
            .map(obj => ({
              name: `${obj.name}\n(${obj.code})`,
              total: parseInt(obj.total / 60)
            }))
            .sort((a, b) => b.total - a.total)
        ]);
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <DateComboBox date={date} setDate={setDate} />
      {isLoading ? "로딩중" : <RenderLineChart data={data} />}
    </div>
  );
}

export default connect(() => ({}), { getTeamStat })(TeamWorkhourBoard);
