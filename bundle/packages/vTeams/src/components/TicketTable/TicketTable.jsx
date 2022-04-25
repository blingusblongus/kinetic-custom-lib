import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TeamsButton from '../TeamsButton/TeamsButton';
import { SearchNormal1 } from 'iconsax-react';
import { fontMedium } from '../../App.scss';
import { DataGrid } from '@mui/x-data-grid';
import {
  bgColorPrimary,
  colorWhite,
} from '../../assets/styles/_variables.scss';
import { history } from '@kineticdata/react';

import './_TicketTable.scss';

import URLS from '../../../globals/urls.js';

import Priority from '../Priority/Priority';

const TicketTable = ({
  columns = [],
  rows = [],
  createBtn = false,
  viewAllBtn = false,
  ...props
}) => {
  const [value, setValue] = useState('');

  const handleRowClick = e => {
    history.push(`${URLS.CLIENT_SUBMIT}/${e.id}`);
  };

  //Basic search bar functionality
  const fields = columns.map(col => col.field);
  const re = new RegExp(value, 'ig');
  const filteredRows = rows?.filter(row => {
    return (
      !value ||
      fields.some(field => {
        return typeof row[field] == 'string' && row[field].match(re);
      })
    );
  });

  return (
    <div className="item-container card-wrapper no-padding datagrid-container">
      <div className="datagrid-header flex">
        <div className="search-icon-wrapper">
          {/* <SearchIcon fontSize="inherit" /> */}
          <SearchNormal1
            size={fontMedium}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="datagrid-search"
          placeholder="Search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <div className="flex-container--right">
          {viewAllBtn && <TeamsButton mode="dark">View All</TeamsButton>}
          {createBtn && (
            <TeamsButton mode="light" linkPath={URLS.CLIENT_SUBMIT}>
              Create New
            </TeamsButton>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            onRowClick={handleRowClick}
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
          />
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
