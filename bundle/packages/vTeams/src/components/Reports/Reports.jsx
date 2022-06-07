import React from 'react';
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
} from '@react-pdf/renderer';

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
  return (
    <div>
      <PDFViewer style={{ width: '100%', height: 800 }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default Reports;
