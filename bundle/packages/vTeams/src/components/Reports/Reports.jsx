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
  const [reportData, setReportData] = useState({});
  const printTarget = useRef();

  const handlePrint = useReactToPrint({
    content: () => printTarget.current,
  });

  useEffect(() => {
    getReportInfoByDateRange('2022-05-10', '2022-06-01').then(response =>
      setReportData(response),
    );
  }, []);

  console.log(reportData);

  return (
    <div>
      <button onClick={handlePrint}>Print ME</button>
      <div className="print-page-container">
        <div className="print-page" ref={printTarget}>
          {Object.keys(reportData).map((org, i) => {
            return <WeeklyReportTemplate orgData={reportData[org]} key={i} />;
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
