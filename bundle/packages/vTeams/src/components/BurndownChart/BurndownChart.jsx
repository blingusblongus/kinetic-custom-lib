import React, { useState } from 'react';
import './_BurndownChart.scss';
import { FORM_FIELDS } from '../../../globals/globals';
import { format, addMonths, addDays, addYears } from 'date-fns';

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

const {
  BILLING_START,
  BILLING_PERIOD,
  HOURS_WORKED,
  MONTHLY_HOURS,
  ANNUAL_HOURS,
} = FORM_FIELDS;

const BurndownChart = ({ clientData, worklogs }) => {
  console.log(clientData);
  if (!clientData || Object.keys(clientData).length < 1) return null;
  const startDate = Date.parse(clientData[BILLING_START]);
  const annualBilling = clientData[BILLING_PERIOD] === 'Annually';
  const endDate = annualBilling
    ? addYears(startDate, 1)
    : addMonths(startDate, 1);
  const data = [];
  let d = startDate;
  let totalHours = annualBilling
    ? clientData[ANNUAL_HOURS]
    : clientData[MONTHLY_HOURS];

  const today = new Date();
  while (d < today) {
    let dailyHours = worklogs
      .filter(
        log =>
          format(d, 'MM/DD/YYYY') === format(log.submittedAt, 'MM/DD/YYYY'),
      )
      .reduce((sum, log) => (sum += Number(log.values[HOURS_WORKED])), 0);

    totalHours -= dailyHours;
    data.push({ name: format(d, 'MM/DD'), hours: totalHours });

    d = addDays(d, 1);
  }

  return (
    <div className="chart-wrapper card-wrapper">
      <h3>Burndown</h3>
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
