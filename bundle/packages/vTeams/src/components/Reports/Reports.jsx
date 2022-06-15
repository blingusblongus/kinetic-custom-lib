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
  const today = new Date();
  const lastWeek = subDays(today, 30);
  const [report, setReport] = useState({});
  const [dates, setDates] = useState({
    start: lastWeek.toISOString().split('T')[0],
    end: today.toISOString().split('T')[0],
  });
  const store = useSelector(store => store);
  const printTarget = useRef();

  const handlePrint = useReactToPrint({
    content: () => printTarget.current,
  });

  const generateReport = () => {
    getReportInfoByDateRange(dates.start, dates.end).then(response =>
      setReport(response),
    );
  };

  useEffect(() => {}, []);

  console.log(report);
  console.log('dates', dates);

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

        <div>
          <button onClick={generateReport}>Generate</button>
          <button onClick={handlePrint}>Print ME</button>
        </div>
      </form>

      <div className="print-page-container">
        <div className="print-page" ref={printTarget}>
          {report.data &&
            Object.keys(report.data).map((org, i) => {
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
