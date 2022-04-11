import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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

import SearchIcon from '@mui/icons-material/Search';
import TeamsButton from '../TeamsButton/TeamsButton';
import { SearchNormal1 } from 'iconsax-react';
import { fontMedium } from '../../App.scss';
import RecentlyViewed from '../RecentlyViewed/RecentlyViewed';

import { columns, rows, data, daysArr } from './modules.js';

import { addBackground } from './plugins.js';

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
  return (
    <div className="dashboard page-panel">
      <div className="grid" id="dashboard-grid">
        <div className="item-container card-wrapper no-padding">
          <div className="datagrid-header flex">
            <div className="search-icon-wrapper">
              {/* <SearchIcon fontSize="inherit" /> */}
              <SearchNormal1 size={fontMedium} />
            </div>
            <input
              type="text"
              className="datagrid-search"
              placeholder="Search"
            />
            <div className="flex-container--right">
              {/* <TeamsButton mode="dark">View All</TeamsButton> */}
              <TeamsButton mode="light">Create New</TeamsButton>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              bgcolor: 'white',
              borderTop: 'none',
              '.MuiDataGrid-columnHeaders': {
                backgroundColor: bgColorPrimary,
                color: colorWhite,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
              '.MuiDataGrid-menuIconButton': {
                color: colorWhite,
                opacity: 1,
              },
              '.MuiDataGrid-sortIcon': {
                color: colorWhite,
                opacity: 1,
              },
            }}
            density="compact"
            autoHeight
          />
        </div>

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
  );
};

export default Dashboard;
