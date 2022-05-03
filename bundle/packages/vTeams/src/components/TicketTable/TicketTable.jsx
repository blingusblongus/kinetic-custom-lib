import React, { useState } from 'react';
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

import { isFulfiller } from '../../lib/utils';
import { useSelector } from 'react-redux';

const TicketTable = ({
  columns = [],
  rows = [],
  createBtn = false,
  viewAllBtn = false,
}) => {
  const [value, setValue] = useState('');
  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isFulfiller(userProfile);

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

  console.log('filteredRows', filteredRows);

  //massage columns
  for (let col of columns) {
    if (col.field === 'Date Due') {
      col.flex = 2;
    }
    if (col.field === 'Full Description') {
      col.flex = 2;
    }
    if (col.field === 'Attachments') {
      col.renderCell = params => {
        if (!params.value) return;
        return (
          <div>
            {params.row.Attachments.map((el, key, arr) => {
              return (
                <a href={el.link} key={key}>
                  {el.name}
                  {key < arr.length - 1 && ', '}
                </a>
              );
            })}
          </div>
        );
      };
      col.valueGetter = params => {
        if (params.value.length < 1) {
          return;
        } else {
          return params.value.map(el => el.name).join(', ');
        }
      };
    }
    if (col.field === 'Priority' || col.field === 'Urgency') {
      col.renderCell = params => <Priority level={params.value} />;
    }
  }

  console.log('columns', columns);
  console.log('rows', filteredRows);

  const filteredColumns = columns.filter(col => {
    if (!fulfiller) {
      const exclude = ['Organization'];
      return !exclude.some(el => el === col.field);
    } else {
      return true;
    }
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
            <TeamsButton mode="light" linkpath={URLS.CLIENT_SUBMIT}>
              Create New
            </TeamsButton>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={filteredRows}
            columns={filteredColumns}
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
