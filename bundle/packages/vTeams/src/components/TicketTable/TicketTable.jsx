import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TeamsButton from '../TeamsButton/TeamsButton';
import { SearchNormal1 } from 'iconsax-react';
import { fontMedium } from '../../App.scss';
import { DataGrid } from '@mui/x-data-grid';
import {
  bgColorPrimary,
  colorWhite,
} from '../../assets/styles/_variables.scss';

import './_TicketTable.scss';

const TicketTable = ({ columns = [], rows = [] }) => {
  return (
    <div className="item-container card-wrapper no-padding">
      <div className="datagrid-header flex">
        <div className="search-icon-wrapper">
          {/* <SearchIcon fontSize="inherit" /> */}
          <SearchNormal1 size={fontMedium} />
        </div>
        <input type="text" className="datagrid-search" placeholder="Search" />
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
  );
};

export default TicketTable;
