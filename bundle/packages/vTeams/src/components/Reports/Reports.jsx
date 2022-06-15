import React, { useEffect, useState, useRef } from 'react';
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
} from '@react-pdf/renderer';
import './Reports.scss';
import { useReactToPrint } from 'react-to-print';
import { getReportInfoByDateRange } from './reports';
import WeeklyReportTemplate from './WeeklyReportTemplate';
import { useSelector } from 'react-redux';
import { format, subDays } from 'date-fns';
import TeamsButton from '../TeamsButton/TeamsButton';

const MyDocument = () => (
  <Document>
    <Page size="A4">
      <Text>Example Text</Text>
      <View>
        <Text>Example Text</Text>
      </View>
    </Page>
  </Document>
);

const Reports = () => {
  const clients = useSelector(store => store.clients);
  const clientList = clients?.submissions.map(
    client => client.values['Organization'],
  );

  const today = new Date();
  const lastWeek = subDays(today, 30);
  const [report, setReport] = useState({});
  const [dates, setDates] = useState({
    start: lastWeek.toISOString().split('T')[0],
    end: today.toISOString().split('T')[0],
  });
  const [includedClients, setIncludedClients] = useState(clientList);

  const printTarget = useRef();

  console.log(clients);

  const handlePrint = useReactToPrint({
    content: () => printTarget.current,
  });

  const generateReport = () => {
    setReport({});
    getReportInfoByDateRange(dates.start, dates.end).then(response => {
      setReport(response);
    });
  };

  useEffect(
    () => {
      setIncludedClients(clientList);
    },
    [clients],
  );

  console.log(report);
  console.log(includedClients);

  return (
    <div className="reports-container">
      <form className="date-range-form" onSubmit={e => e.preventDefault()}>
        <h1>Generate Reports</h1>
        <span>
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            value={dates.start}
            name="start-date"
            onChange={e => setDates({ ...dates, start: e.target.value })}
          />
        </span>
        <span>
          <label htmlFor="end-date">End Date</label>
          <input
            type="date"
            value={dates.end}
            name="end-date"
            onChange={e => setDates({ ...dates, start: e.target.value })}
          />
        </span>
        <span>
          <label htmlFor="org-select">Client</label>
          <select
            name="org-select"
            onChange={e => {
              if (e.target.value === 'all') {
                setIncludedClients(clientList);
              } else {
                setIncludedClients([e.target.value]);
              }
            }}
          >
            <option value="all">All</option>
            {clientList.map(client => {
              return (
                <option value={client} key={client}>
                  {client}
                </option>
              );
            })}
          </select>
        </span>

        <div>
          <TeamsButton onClick={generateReport}>Generate</TeamsButton>
          {report.data && (
            <TeamsButton onClick={handlePrint}>Print ME</TeamsButton>
          )}
        </div>
      </form>

      <div className={`print-page-container`}>
        <div
          className={`print-page${report.data ? ' report-generated' : ''}`}
          ref={printTarget}
        >
          {report.data &&
            includedClients.map((org, i) => {
              return (
                <WeeklyReportTemplate
                  orgData={report.data[org]}
                  startDate={report.startDate}
                  endDate={report.endDate}
                  key={i}
                />
              );
            })}
        </div>
      </div>
      {/* <PDFViewer style={{ width: '100%', height: 800 }}>
        <MyDocument />
      </PDFViewer> */}
    </div>
  );
};

export default Reports;
