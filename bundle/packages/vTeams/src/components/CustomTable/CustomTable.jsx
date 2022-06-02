import React, { useEffect, useState } from 'react';
import TeamsButton from '../TeamsButton/TeamsButton';
import { useDispatch, useSelector } from 'react-redux';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import { SLUGS, FORM_FIELDS } from '../../../globals/globals';
import './CustomTable.scss';

const CustomTable = ({ kapp, form, searchOptions }) => {
  const [searchResult, setSearchResult] = useState({});

  // //set defaults here instead of in parameters to avoid effect looping
  // // if(!searchOptions){
  // //   searchOptions = {
  // //     limit: 5,
  // //     include: 'values',
  // //   }
  // // }

  // // let options = searchOptions;

  // // Programmatically build search object

  // const doSearch = (searchOptions) => {
  //   let testSearch = new SubmissionSearch()
  //   for (let key in searchOptions) {
  //     const value = searchOptions[key];
  //     testSearch[key](value);
  //   }
  //   testSearch = testSearch.build();

  //   searchSubmissions({kapp, form, search: testSearch})
  //       .then(result => setSearchResult(result))
  //       .catch(err => console.error(err));
  // }

  // console.log(searchResult)

  // // const search = new SubmissionSearch()
  // // .pageToken(nextPageToken)
  // // .include('values')
  // // .build();

  // const rows = useSelector(store => store.tickets.submissions);
  // const nextPageToken = useSelector(store => store.tickets.nextPageToken);
  // const nextPageSearch = new SubmissionSearch()
  //   .pageToken(nextPageToken)
  //   .include('values')
  //   .build();

  //   useEffect(() => {
  //     doSearch();
  //   }, [searchOptions])

  const defaultSearch = () => {
    let testSearch = new SubmissionSearch();
    for (let key in searchOptions) {
      const value = searchOptions[key];
      value && testSearch[key](value);
    }
    testSearch = testSearch.build();

    searchSubmissions({ kapp, form, search: testSearch })
      .then(result => setSearchResult(result))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    defaultSearch();
  }, []);

  return (
    <div className="card-wrapper">
      <div className="table-header">
        <span className="table-title">Active Tickets</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Requested Date</th>
            <th>Requested Date</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.submissions?.map((submission, i) => {
            const { TITLE, DATE_DUE } = FORM_FIELDS;
            return (
              <tr key={i}>
                <td>{submission.values[TITLE]}</td>
                <td>{submission.values['Description']}</td>
                <td>{submission.values[DATE_DUE]}</td>
                <td>{submission.values[TITLE]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <TeamsButton>Next Page</TeamsButton>
        <TeamsButton>Prev Page</TeamsButton>
      </div>
    </div>
  );
};

export default CustomTable;
