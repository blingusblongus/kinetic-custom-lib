import React, { useEffect, useState } from 'react';

import './Dashboard.scss';
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

import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';
import { PageTitle } from '@kineticdata/bundle-common';

import { columns as c, rows as r, data, daysArr } from './modules.js';

import { addBackground } from './plugins.js';
import TicketTable from '../TicketTable/TicketTable';

import {
  searchSubmissions,
  SubmissionSearch,
  SubmissionTable,
} from '@kineticdata/react';
import { parseSubsToTablegrid } from '../../../../customUtils/utils.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const [rowData, setRowData] = useState('');
  let [columns, rows] = parseSubsToTablegrid(rowData);

  useEffect(() => {
    const search = new SubmissionSearch().include('values').build();

    searchSubmissions({ kapp: 'vteams', form: 'tickets', search }).then(
      result => setRowData(result.submissions),
    );
  }, []);

  return (
    <>
      <PageTitle parts={['Home']} />
      <div className="dashboard page-panel">
        <div className="grid" id="dashboard-grid">
          <TicketTable columns={columns || c} rows={rows || r} createBtn />
          <div className="flex flex-column" id="dashboard-col-report">
            <RecentlyViewed />
            {/* <div className="card-wrapper">
            <div className="card-title">Weekly Reports</div>
            
          </div> */}
            <div className="card-wrapper">
              <div className="card-title">Burn Down</div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
