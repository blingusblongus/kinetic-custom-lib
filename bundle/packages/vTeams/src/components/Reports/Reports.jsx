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
  const [report, setReport] = useState({});
  const [dates, setDates] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const printTarget = useRef();

  const handlePrint = useReactToPrint({
    content: () => printTarget.current,
  });

  const generateReport = () => {
    getReportInfoByDateRange(dates.start, dates.end).then(response =>
      setReport(response),
    );
  };

  useEffect(() => {
    // getReportInfoByDateRange('2022-05-10', '2022-06-01').then(response =>
    //   setReport(response),
    // );
  }, []);

  console.log(report);
  console.log('dates', dates);

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          value={dates.start}
          name="start-date"
          onChange={e => setDates({ ...dates, start: e.target.value })}
        />
        <label htmlFor="end-date">End Date</label>
        <input
          type="date"
          value={dates.end}
          name="end-date"
          onChange={e => setDates({ ...dates, start: e.target.value })}
        />

        <button onClick={generateReport}>Generate</button>
      </form>
      <button onClick={handlePrint}>Print ME</button>
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
