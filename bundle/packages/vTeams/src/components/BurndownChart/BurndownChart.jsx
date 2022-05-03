import React from 'react';
import './_BurndownChart.scss';

import {
  bgColorPrimary,
  colorWhite,
} from '../../assets/styles/_variables.scss';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { addBackground } from './plugins';
import { data, daysArr } from './modules';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const BurndownChart = () => {
  return (
    <div className="chart-wrapper">
      <Line
        plugins={[addBackground]}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                // borderWidth: 2,
                color: 'rgba(180,180,180,.1)',
                lineWidth: 2,
                borderDash: [6, 6],
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 3,
            },
            line: {
              borderWidth: 1,
            },
          },
        }}
        data={{
          labels: daysArr,
          datasets: [
            {
              label: 'Hours Remaining',
              data: data,
              backgroundColor: bgColorPrimary,
              borderColor: bgColorPrimary,
            },
          ],
        }}
      />
    </div>
  );
};

export default BurndownChart;
