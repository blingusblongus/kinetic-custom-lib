import React, { useEffect, useState } from 'react';
import TeamsButton from '../TeamsButton/TeamsButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  SubmissionSearch,
  searchSubmissions,
  fetchForm,
} from '@kineticdata/react';
import { SLUGS, FORM_FIELDS } from '../../../globals/globals';
import './CustomTable.scss';

const CustomTable = ({ label, kapp, form, searchOptions }) => {
  const [searchResult, setSearchResult] = useState({});

  const [fields, setFields] = useState([]);
  const [settingsPos, setSettingsPos] = useState({ top: null, left: null });

  const [visible, setVisible] = useState([
    'Title',
    'Description',
    'Requested Date Due',
  ]);
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

    fetchForm({ kappSlug: kapp, formSlug: form, include: 'fields' })
      .then(({ form }) => setFields(form.fields.map(field => field.name)))
      .catch(err => console.error(err));
  }, []);

  console.log(searchResult.submissions);
  console.log(fields);

  const Settings = () => {
    return (
      <div
        className="table-settings"
        style={{ position: 'fixed', ...settingsPos }}
      >
        <div>Show Column</div>
        {fields.map(field => {
          let checked = visible.includes(field);
          const handleCheck = () => {
            if (checked) {
              setVisible(visible.filter(el => el != field));
            } else {
              setVisible([...visible, field]);
            }
          };
          return (
            <div key={field}>
              <input type="checkbox" checked={checked} onChange={handleCheck} />
              <label>{field}</label>
            </div>
          );
        })}
      </div>
    );
  };

  console.log(settingsPos);

  return (
    <div className="card-wrapper">
      <div className="table-header">
        <span className="table-title">{label}</span>
      </div>
      <table>
        <thead
          onMouseUp={e => {
            e.preventDefault();
            setSettingsPos({ top: e.pageY, left: e.pageX });
          }}
        >
          <tr>
            {visible.map(f => {
              return <th key={f}>{f}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {searchResult.submissions?.map((submission, i) => {
            const { TITLE, DESCRIPTION, STATUS, DATE_DUE } = FORM_FIELDS;
            return (
              <tr key={i}>
                {visible.map(f => {
                  return <td key={f}>{submission.values[f]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <TeamsButton>Next Page</TeamsButton>
        <TeamsButton>Prev Page</TeamsButton>
        <TeamsButton>Settings</TeamsButton>
      </div>
      <Settings />
    </div>
  );
};

export default CustomTable;
