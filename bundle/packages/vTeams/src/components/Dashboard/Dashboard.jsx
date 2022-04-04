import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Dashboard.scss';
import { bgColorPrimary, colorWhite } from '../../App.scss';

const Dashboard = () => {
  // Example Columns, Rows
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
  // ^^^^^^^^^^^End Example Data

  return (
    <div className="page-panel">
      <div className="grid" id="dashboard-grid">
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            bgcolor: 'white',
            '.MuiDataGrid-columnHeaders': {
              backgroundColor: bgColorPrimary,
              color: colorWhite,
            },
          }}
          density="compact"
          autoHeight
          getRowClassName={params => console.log(params)}
        />
        <div className="flex flex-column">
          <div className="card-wrapper">
            <div className="card-title">Weekly Reports</div>
          </div>
          <div className="card-wrapper">
            <div className="card-title">Burn Down</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
