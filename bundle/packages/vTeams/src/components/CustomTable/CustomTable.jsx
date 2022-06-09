import React, { useEffect, useState, useRef } from 'react';

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
import { useSelector } from 'react-redux';

const CustomTable = ({ label, kapp, form, searchOptions, myTickets }) => {
  const [searchResult, setSearchResult] = useState({});
  // const tableSettings = useSelector(store => store.settings.settings?.find(obj => obj.name == label));
  const [fields, setFields] = useState([]);
  const [settingsPos, setSettingsPos] = useState({ top: null, left: null });
  const [showSettings, setShowSettings] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    criteria: 'Status',
    ascending: true,
  });
  const [filterOptions, setFilterOptions] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const userProfile = useSelector(store => store.app.profile);

  const filteredSubmissions = searchResult.submissions?.filter(sub => {
    //exclude non-personal tickets
    if (myTickets && sub.submittedBy !== userProfile.username) return false;

    //generic filter
    for (let key in filterOptions) {
      const filterValue = filterOptions[key]?.toLowerCase();
      if (!filterValue) continue;
      if (!sub.values[key]) return false;

      const subValue = sub.values[key]?.toLowerCase();

      if (sub.values[key] && subValue.indexOf(filterValue) == -1) {
        return false;
      }
    }
    return true;
  });

  const sortedSubmissions = filteredSubmissions?.sort((a, b) => {
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
      setSortOptions({ ...sortOptions, ascending: !sortOptions.ascending });
    } else {
      setSortOptions({ ...sortOptions, criteria: field });
    }
  };

  const handleFilterClick = (e, field) => {
    e.stopPropagation();
  };

  // Set settings menu position and open it (or close it)
  const handleSettingsClick = e => {
    e.stopPropagation();

    if (showSettings) return setShowSettings(false);

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
        <thead>
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
                      <span onClick={e => handleFilterClick(e, f)}>
                        {filterOptions[f] && (
                          <i
                            className="fa fa-filter"
                            onClick={() => {
                              delete filterOptions[f];
                              setFilterOptions({ ...filterOptions });
                            }}
                          />
                        )}
                      </span>
                    </span>
                  </span>
                </th>
              );
            })}
            <th>
              <span>
                <i className="fa fa-columns" onClick={handleSettingsClick} />
                <i
                  className="fa fa-filter"
                  onClick={() => setShowFilter(!showFilter)}
                />
              </span>
            </th>
          </tr>
          {showFilter && (
            <tr>
              {visible.map(f => {
                return (
                  <th key={f}>
                    <input
                      type="text"
                      value={filterOptions[f] || ''}
                      onChange={e => {
                        setFilterOptions({
                          ...filterOptions,
                          [f]: e.target.value,
                        });
                      }}
                    />
                  </th>
                );
              })}
            </tr>
          )}
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

          {/* Empty Submission Display */}
          {sortedSubmissions?.length < 1 && (
            <tr>
              <td className="no-ticket-msg" colSpan="100%">
                No Tickets Available
              </td>
            </tr>
          )}
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
