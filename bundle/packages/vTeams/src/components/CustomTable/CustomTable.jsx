import React, { useEffect, useState, useRef } from 'react';
import TeamsButton from '../TeamsButton/TeamsButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  SubmissionSearch,
  searchSubmissions,
  fetchForm,
  history,
} from '@kineticdata/react';
import { SLUGS, FORM_FIELDS } from '../../../globals/globals';
import URLS from '../../../globals/urls';
import './CustomTable.scss';

const CustomTable = ({ label, kapp, form, searchOptions }) => {
  const [searchResult, setSearchResult] = useState({});
  // const tableSettings = useSelector(store => store.settings.settings?.find(obj => obj.name == label));
  const [fields, setFields] = useState([]);
  const [settingsPos, setSettingsPos] = useState({ top: null, left: null });
  const [showSettings, setShowSettings] = useState(false);

  // const userSettings = {
  //   settingsId: null,
  //   tables: [{
  //     name: 'Active Tickets',
  //     visible: ['Title', 'Description', 'Requested Date Due'],
  //   }]
  // };

  const [visible, setVisible] = useState([
    'Requested Date Due',
    'Title',
    'Description',
    'Status',
    'Assignee',
  ]);
  const columnExcludes = [
    'Attachments',
    'Organization - deprecated',
    'Number',
    'Organization ID',
  ];

  const tableRef = useRef(null);
  const settingsRef = useRef(null);

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

  const handleRowClick = id => {
    history.push(`${URLS.CLIENT_SUBMIT}/${id}`);
  };

  useEffect(() => {
    defaultSearch();

    fetchForm({ kappSlug: kapp, formSlug: form, include: 'fields' })
      .then(({ form }) => setFields(form.fields.map(field => field.name)))
      .catch(err => console.error(err));
  }, []);

  const Settings = React.forwardRef((props, settingsRef) => {
    // const closeModal = e => {
    //   if (settingsRef.current && !settingsRef.current.contains(e.target)) {
    //     console.log('you clicked outside of me!');
    //   } else {
    //     console.log('you clicked inside me?');
    //   }
    // };
    return (
      <div
        className="table-settings"
        style={{ position: 'absolute', ...settingsPos }}
        ref={settingsRef}
        // onMouseUp={closeModal}
      >
        <div className="settings-header">
          <span>Columns</span>
          <span
            className="settings-close"
            onClick={() => setShowSettings(false)}
          >
            [X] Close
          </span>
        </div>
        {fields.map(field => {
          let checked = visible.includes(field);
          const handleCheck = () => {
            if (checked) {
              setVisible(visible.filter(el => el != field));
            } else {
              setVisible([...visible, field]);
            }
          };

          if (!columnExcludes.includes(field))
            return (
              <div key={field}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheck}
                />
                <label>{field}</label>
              </div>
            );
        })}
      </div>
    );
  });

  // console.log(settingsPos);
  // console.log({
  //   x: tableRef.current?.offsetLeft,
  //   y: tableRef.current?.offsetTop,
  // });

  return (
    <div className="card-wrapper">
      <div className="table-header">
        <span className="table-title">{label}</span>
      </div>
      <table ref={tableRef}>
        <thead
          onMouseUp={e => {
            e.preventDefault();
            setShowSettings(true);
            setSettingsPos({
              top: e.pageY - tableRef.current?.offsetTop,
              left: e.pageX - tableRef.current?.offsetLeft,
            });
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
            const id = submission.id;
            return (
              <tr key={i} onClick={() => handleRowClick(id)}>
                {visible.map(f => {
                  let content;
                  if (typeof f == 'object') {
                    content = JSON.parse(f);
                  } else {
                    content = submission.values[f];
                  }
                  return <td key={f + content}>{content}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        {/* <TeamsButton>Next Page</TeamsButton> */}
        {/* <TeamsButton>Prev Page</TeamsButton> */}
        {/* <TeamsButton>Settings</TeamsButton> */}
      </div>
      {showSettings && <Settings ref={settingsRef} />}
    </div>
  );
};

export default CustomTable;
