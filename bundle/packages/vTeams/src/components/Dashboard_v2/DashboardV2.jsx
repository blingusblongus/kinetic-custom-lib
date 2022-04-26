import React, { useEffect, useState } from 'react';

import './DashboardV2.scss';
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

// import { columns as c, rows as r, data, daysArr } from './modules.js';

// import { addBackground } from './plugins.js';
import TicketTable from '../TicketTable/TicketTable';

import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
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

  // fetch submissions
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
        <div className="table-wrapper">
          <TicketTable columns={columns} rows={rows} createBtn />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
