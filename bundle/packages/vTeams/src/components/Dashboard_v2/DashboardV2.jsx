import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

import { PageTitle } from '@kineticdata/bundle-common';

import TicketTable from '../TicketTable/TicketTable';

import { searchSubmissions, SubmissionSearch } from '@kineticdata/react';
import { parseSubsToTablegrid } from '../../../../customUtils/utils.js';

import { Utils } from '@kineticdata/bundle-common';

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
  const store = useSelector(store => store);
  console.log(store);

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
