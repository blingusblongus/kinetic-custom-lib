import React from 'react';
import { format, addMonths, addYears } from 'date-fns';
import './ReportTemplate.scss';
import { useSelector } from 'react-redux';
import { FORM_FIELDS } from '../../../globals/globals';
import { getAttachmentDownload } from '../../../../customUtils/utils';

const {
  ORGANIZATION,
  MONTHLY_HOURS,
  ANNUAL_HOURS,
  BILLING_START,
  BILLING_PERIOD,
} = FORM_FIELDS;

const ReportTemplate = ({ orgData, startDate, endDate }) => {
  console.log(orgData);
  const client = orgData[ORGANIZATION];
  const totalHours = orgData[MONTHLY_HOURS] || orgData[ANNUAL_HOURS];
  const logoUrl = getAttachmentDownload(orgData['Logo']);
  const annualBilling = orgData[BILLING_PERIOD] === 'Annually';
  const billingStartDate = orgData[BILLING_START];
  const billingEndDate = annualBilling
    ? addYears(billingStartDate, 1)
    : addMonths(billingStartDate, 1);
  const worklogs = orgData['worklogs'];
  const hoursWorked = orgData['hoursWorked'];

  const today = new Date();
  const dateFormat = 'MMM Do, YYYY';

  const tickets = useSelector(store => store.tickets);

  const days = [];
  for (let log of worklogs) {
    let strDate = log['submittedAt'].split('T')[0];
    let index = days.findIndex(day => strDate === day.stringDate);

    if (days[index]) {
      days[index].logs.push(log);
    } else {
      days.push({ stringDate: strDate, logs: [log] });
    }
  }

  days.sort((a, b) => (a.stringDate > b.stringDate ? 1 : -1));

  return (
    <div className="weekly-report-page page-break">
      <div className="main">
        <header>
          <img src="https://kineticbundledev.s3.us-east-2.amazonaws.com/build/static/media/esolutions_logo_green.182c7269.svg" />

          <div>
            <div>esolutionsONE, Inc</div>
            <div>Transforming Your Business Workflows on the Now Platform</div>
          </div>
        </header>
        <h1>Client Report</h1>
        <h2>{client}</h2>

        <div className="logo-container">
          <img src={logoUrl} alt={client + ' logo'} className="client-logo" />
        </div>

        <h3>Executive Summary</h3>
        <div className="summary-grid">
          <div>Report Prepared On: </div>
          <div>{format(today, dateFormat)}</div>

          <div>Report Date Range:</div>
          <div>
            {format(startDate, dateFormat)} - {format(endDate, dateFormat)}
          </div>

          {/* <div>Billing Period:</div>
          <div>{format(billingStartDate, dateFormat) + " - " +
            format(billingEndDate, dateFormat)}</div>

          <div>Total Hours This Period:</div>
          <div>{totalHours}</div> */}

          <div>Hours Consumed:</div>
          <div>{hoursWorked}</div>

          {/* <div>Hours Remaining:</div>
          <div>{totalHours - hoursWorked}</div> */}
        </div>

        <h3>Work Details</h3>
        <p>
          Below are the details of all work carried out for you during this week
          against each of the tickets we worked on.
        </p>

        {days.length < 1 && (
          <div className="message-no-logs">No Logs in Given Date Range</div>
        )}

        {days.map(day => {
          const dayHours =
            day.logs.reduce((sum, log) => {
              return (sum += parseFloat(log.values['Hours Worked']));
            }, 0) || 0;

          return (
            <div key={day.stringDate} className="report-day-table">
              <h3>{format(day.stringDate, dateFormat)}</h3>
              <table>
                <thead style={{ textAlign: 'left' }}>
                  <tr>
                    {/* <th>Date</th> */}
                    <th>Title</th>
                    <th>Notes</th>
                    <th>Consultant</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {day.logs.map(log => {
                    console.log(log);
                    const hours = log.values['Hours Worked'];
                    const consultant = log.values['Commenter'];
                    const notes = log.values['Comment'];
                    const date = format(log.submittedAt, dateFormat);

                    const ticket = tickets.submissions.find(
                      t => t.id === log.values['Ticket ID'],
                    );
                    const ticketTitle = ticket?.values['Title'];

                    return (
                      <tr key={log.id}>
                        {/* <td>{date}</td> */}
                        <td>{ticketTitle}</td>
                        <td>{notes}</td>
                        <td>{consultant}</td>
                        <td>{hours}</td>
                      </tr>
                    );
                  })}
                  {worklogs.length < 1 && (
                    <tr>
                      <td colSpan={'100%'} style={{ textAlign: 'center' }}>
                        No Worklogs to Display
                      </td>
                    </tr>
                  )}
                  <tr className="totals-row">
                    <td colSpan="3">Total Hours</td>
                    <td>{dayHours}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <footer>
        <div>Virtual Teams is an e:solutionsOne Inc remote managed service</div>
        <div>
          CONFIDENTIAL - for e:solutionsOne virtual teams staff and the intended
          recipient(s) only
        </div>
      </footer>
      <div className="no-print">
        <hr />
        End of Report
        <hr />
      </div>
    </div>
  );
};

export default ReportTemplate;
