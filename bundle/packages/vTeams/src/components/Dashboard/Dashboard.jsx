import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Dashboard.scss';
import { bgColorPrimary, colorWhite } from '../../App.scss';
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
  // Example Data
  // Table
  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 140,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 50,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: params =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  // Burndown graph
  const data = [
    { x: 1, y: 50 },
    { x: 10, y: 45 },
    { x: 13, y: 24 },
    { x: 16, y: 20 },
    { x: 24, y: 12 },
  ];
  // ^^^^^^^^^^^End Example Data

  const daysArr = [...Array(31).keys()];

  return (
    <div className="page-panel">
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
              <TeamsButton mode="dark">View All</TeamsButton>
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
          <div className="card-wrapper">
            <div className="card-title">Weekly Reports</div>
          </div>
          <div className="card-wrapper">
            <div className="card-title">Burn Down</div>
            <div className="chart-wrapper">
              <Line
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
                data={{
                  labels: daysArr,
                  datasets: [
                    {
                      label: 'Burn Down',
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
