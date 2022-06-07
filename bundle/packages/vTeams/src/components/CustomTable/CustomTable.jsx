import React, { useEffect, useState, useRef } from 'react';
import TeamsButton from '../TeamsButton/TeamsButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  SubmissionSearch,
  searchSubmissions,
  fetchForm,
  history,
} from '@kineticdata/react';
import Settings from './SettingsMenu';
import { SLUGS, FORM_FIELDS } from '../../../globals/globals';
import URLS from '../../../globals/urls';
import './CustomTable.scss';

const CustomTable = ({ label, kapp, form, searchOptions }) => {
  const [searchResult, setSearchResult] = useState({});
  // const tableSettings = useSelector(store => store.settings.settings?.find(obj => obj.name == label));
  const [fields, setFields] = useState([]);
  const [settingsPos, setSettingsPos] = useState({ top: null, left: null });
  const [showSettings, setShowSettings] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    criteria: 'Status',
    ascending: true,
  });

  const sortedSubmissions = searchResult.submissions?.sort((a, b) => {
    const { criteria, ascending } = sortOptions;
    a = a.values[criteria];
    b = b.values[criteria];

    if (a === b) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    if (ascending) {
      return a < b ? -1 : 1;
    } else {
      return a > b ? -1 : 1;
    }
  });

  const [visible, setVisible] = useState([
    'Requested Date Due',
    'Title',
    'Description',
    'Status',
    'Assignee',
  ]);

  const tableRef = useRef(null);
  const settingsRef = useRef(null);

  // Default Search on component mount
  const defaultSearch = () => {
    let testSearch = new SubmissionSearch();
    // Configure search object with passed in searchOptions
    for (let key in searchOptions) {
      const value = searchOptions[key];
      value && testSearch[key](value);
    }
    testSearch = testSearch.build();

    // send search
    searchSubmissions({ kapp, form, search: testSearch })
      .then(result => setSearchResult(result))
      .catch(err => console.error(err));
  };

  // Redirect to Ticket Page
  const handleRowClick = id => {
    history.push(`${URLS.CLIENT_SUBMIT}/${id}`);
  };

  const handleHeaderClick = field => {
    if (field == sortOptions.criteria) {
      console.log('flip ascending', sortOptions.ascending);
      setSortOptions({ ...sortOptions, ascending: !sortOptions.ascending });
    } else {
      setSortOptions({ ...sortOptions, criteria: field });
    }
  };

  // Set filter menu position and open it (or close it)
  const handleFilterClick = e => {
    e.stopPropagation();

    let offsetLeft;
    let right = window.innerWidth - e.pageX;

    if (right < 300) {
      offsetLeft = e.pageX - tableRef.current?.offsetLeft - 100;
    } else {
      offsetLeft = e.pageX - tableRef.current?.offsetLeft;
    }

    setSettingsPos({
      top: e.pageY - tableRef.current?.offsetTop,
      left: offsetLeft,
    });

    setShowSettings(true);
  };

  useEffect(() => {
    defaultSearch();

    fetchForm({ kappSlug: kapp, formSlug: form, include: 'fields' })
      .then(({ form }) => setFields(form.fields.map(field => field.name)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card-wrapper">
      <div className="table-header">
        <span className="table-title">{label}</span>
      </div>
      <table ref={tableRef}>
        <thead
          onMouseUp={e => {
            e.preventDefault();
          }}
        >
          <tr>
            {visible.map(f => {
              return (
                <th key={f} onClick={() => handleHeaderClick(f)}>
                  <span className="header-cell">
                    <span className="column-header">{f}</span>
                    <span>
                      {sortOptions.criteria === f &&
                        (sortOptions.ascending ? (
                          <span className="arrow">&uarr;</span>
                        ) : (
                          <span className="arrow">&darr;</span>
                        ))}
                      <span onClick={handleFilterClick}>
                        <i className="fa fa-filter" />
                      </span>
                    </span>
                  </span>
                </th>
              );
            })}
            {/* <th>&#9881;</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions?.map((submission, i) => {
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
                <td />
              </tr>
            );
          })}
        </tbody>
      </table>

      {showSettings && (
        <Settings
          settingsPos={settingsPos}
          visible={visible}
          setVisible={setVisible}
          fields={fields}
          setShowSettings={setShowSettings}
          ref={settingsRef}
        />
      )}
    </div>
  );
};

export default CustomTable;
