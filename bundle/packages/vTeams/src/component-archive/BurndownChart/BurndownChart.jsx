import React, { useState } from 'react';
import './_BurndownChart.scss';

import {
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BurndownChart = ({ data }) => {
  console.log(data);
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width={'100%'} height={200}>
        <LineChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis>
            <Label
              value="Hours Remaining"
              angle={-90}
              // position="left"
              dx={-10}
            />
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BurndownChart;
