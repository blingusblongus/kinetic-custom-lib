import React from 'react';
import { format } from 'date-fns';
import './WeeklyReportTemplate.scss';

const WeeklyReportTemplate = ({ orgData, startDate, endDate }) => {
  console.log(orgData);
  const client = orgData['Organization'];
  const monthlyHours = orgData['Monthly Hours'];
  const logoUrl = orgData['Logo Url'];
  const billingStartDate = orgData['Current Billing Period Start Date'];
  const worklogs = orgData['worklogs'];
  const hoursWorked = orgData['hoursWorked'];

  const today = new Date();
  const dateFormat = 'MMM Do, YYYY';

  return (
    <div className="weekly-report-page page-break">
      <header>
        <img src="https://kineticbundledev.s3.us-east-2.amazonaws.com/build/static/media/esolutions_logo_green.182c7269.svg" />

        <div>
          <div>esolutionsONE, Inc</div>
          <div>Transforming Your Business Workflows on the Now Platform</div>
        </div>
      </header>
      <h1>Weekly Client Report</h1>
      <h2>{client}</h2>

      <div className="logo-container">
        <img src={logoUrl} alt={client + ' logo'} className="client-logo" />
      </div>

      <h3>Executive Summary</h3>
      <div className="summary-grid">
        {/* <div>Week Commencing: </div>
                <div>${vars('week_commencing')}</div> */}
        <div>Report Prepared On: </div>
        <div>{format(today, dateFormat)}</div>

        <div>Date Range:</div>
        <div>
          {format(startDate, dateFormat)} - {format(endDate, dateFormat)}
        </div>
        <div>Hours Consumed: {hoursWorked}</div>
        {/* <div>${vars('hours_consumed')}</div>
                <div>Monthly Hours:</div>
                <div>${vars('monthly_hours')}</div>
                <div>Monthly Hours Consumed:</div>
                <div>${vars('monthly_hours_used')}</div>
                <div>Monthly Hours Remaining:</div>
                <div>${vars('monthly_hours_remaining')}</div> */}
      </div>

      <h3>Work Details</h3>
      <p>
        Below are the details of all work carried out for you during this week
        against each of the tickets we worked on.
      </p>

      {/* ${vars('activities_html')} */}
      {/* <!-- <table>
                <thead style="text-align: left;">
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Notes</th>
                        <th>Consultant</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    ${vars('activities_html')}
                    <tr className="totals-row">
                        <td colspan="4">Total Hours</td>
                        <td>${vars('hours_consumed')}</td>
                    </tr>
                </tbody>
            </table> --> */}
      <footer>
        <div>Virtual Teams is an e:solutionsOne Inc remote managed service</div>
        <div>
          CONFIDENTIAL - for e:solutionsOne virtual teams staff and the intended
          recipient(s) only
        </div>
      </footer>
    </div>
  );
};

export default WeeklyReportTemplate;

// {
//     "Organization": "Hennepin Health",
//     "Monthly Hours": "50",
//     "Primary Contact": "nallen@esolutionsone.com",
//     "Logo Url": "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/x1qyhjheukivbd0pbde6",
//     "Current Billing Period Start Date": "2022-05-12",
//     "worklogs": [
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "AF52C1",
//             "id": "c725fccd-e66a-11ec-9713-d549fbaf52c1",
//             "label": "vteams-client",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-06-07T14:04:42.372Z",
//             "submittedBy": "vteams-client",
//             "type": null,
//             "values": {
//                 "Comment": "hey whats the eta on this?",
//                 "Ticket ID": "bd31c236-e356-11ec-bd2c-b90a2a35c2d3",
//                 "Commenter": "vteams-client",
//                 "isFulfiller": "false",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "false"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "2C8CDC",
//             "id": "2175a24a-dc34-11ec-9713-efab2c2c8cdc",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-25T14:08:19.941Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "3",
//                 "Comment": "Additional Work Log to test breaking reports into day by day collections",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "B0FB54",
//             "id": "85c09ad3-dac4-11ec-bd2c-ed7355b0fb54",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-23T18:16:53.408Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Comment": "Comment Added",
//                 "Ticket ID": "a9e7092c-d6e8-11ec-bd2c-7785726e7b7f",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "false"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "CDCBE2",
//             "id": "5393f97e-d85c-11ec-9713-a353a1cdcbe2",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-20T16:45:59.244Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "4",
//                 "Comment": "additional Work Log for chart testing",
//                 "Ticket ID": "a9e7092c-d6e8-11ec-bd2c-7785726e7b7f",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "DDE6B7",
//             "id": "f05e71f4-d2ce-11ec-bd2c-416878dde6b7",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-13T15:11:17.946Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "4",
//                 "Comment": "Testing work log checked",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "A8CA97",
//             "id": "e24b0a65-d2cd-11ec-bd2c-99d49da8ca97",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-13T15:03:44.834Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "10",
//                 "Comment": "- Additional Features Added",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "B1452B",
//             "id": "df9cf6e9-d2cc-11ec-bd2c-615f93b1452b",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-13T14:56:30.841Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "5",
//                 "Comment": "- Added some feature",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "829568",
//             "id": "cd4a2e53-d0a3-11ec-b72e-231da1829568",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-10T20:57:28.408Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "5",
//                 "Comment": "Test aggregation with updated work log bool field",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "96B778",
//             "id": "c882d7bd-d0a2-11ec-b72e-2f302196b778",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-10T20:50:10.894Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "4",
//                 "Comment": "More Work Notes, to test aggregation",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         },
//         {
//             "closedAt": null,
//             "closedBy": null,
//             "coreState": "Submitted",
//             "currentPage": "Page 1",
//             "displayedPage": {
//                 "index": 0,
//                 "name": "Page 1",
//                 "type": "submittable"
//             },
//             "handle": "248C1E",
//             "id": "bb811f4b-d082-11ec-b72e-a71ccd248c1e",
//             "label": "nicholas allen",
//             "origin": null,
//             "parent": null,
//             "sessionToken": null,
//             "submittedAt": "2022-05-10T17:00:45.177Z",
//             "submittedBy": "nicholas allen",
//             "type": null,
//             "values": {
//                 "Hours Worked": "2",
//                 "Comment": "Test Work Log marked",
//                 "Ticket ID": "077a4f68-d075-11ec-85b8-4fc073472c01",
//                 "Commenter": "Nick",
//                 "isFulfiller": "true",
//                 "Organization": "Hennepin Health",
//                 "isWorkLog": "true"
//             }
//         }
//     ],
//     "hoursWorked": 34
// }
