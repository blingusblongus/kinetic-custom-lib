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
import { format } from 'date-fns';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';
import { isFulfiller } from '../../lib/utils';

const CustomTable = ({ label, kapp, form, searchOptions, submitter }) => {
  const [searchResult, setSearchResult] = useState({});
  // const tableSettings = useSelector(store => store.settings.settings?.find(obj => obj.name == label));
  const [fields, setFields] = useState([]);
  const [settingsPos, setSettingsPos] = useState({ top: null, left: null });
  const [showSettings, setShowSettings] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    criteria: 'Submitted At',
    ascending: false,
  });
  const [filterOptions, setFilterOptions] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const userProfile = useSelector(store => store.app.profile);
  const clientNames = useSelector(store =>
    store.clients?.submissions.map(client => client.values.Organization),
  );
  console.log(clientNames);
  const [perPage, setPerPage] = useState(25);
  const [pageStart, setPageStart] = useState(0);
  const [visible, setVisible] = useState([
    'Submitted At',
    'Requested Date Due',
    'Title',
    'Description',
    'Status',
    'Assignee',
  ]);
  const fulfiller = isMemberOf(userProfile, 'vTeams');
  const [selectValue, setSelectValue] = useState(isFulfiller ? 'active' : '');
  const [selectClientValue, setSelectClientValue] = useState('all');

  console.log(selectValue);

  const dateFormat = 'M/d/YY';

  // sortMap is stopgap solution
  // better to figure out how to fetch mappings from the form itself
  const sortMap = {
    ['Status']: {
      'Not Started': 1,
      'In Progress': 2,
      Completed: 3,
      Resolved: 4,
    },
  };

  // Filter submissions according to props.submitter and state.selectValue
  const filteredSubmissions = searchResult.submissions?.filter(sub => {
    // handle optional submitter prop
    if (submitter) {
      switch (submitter) {
        case 'me':
          if (sub.submittedBy !== userProfile.username) return false;
          break;
        case 'others':
          if (sub.submittedBy === userProfile.username) return false;
          break;
        case 'all':
        default:
          break;
      }
    }

    // Filter by Label Select
    switch (selectValue) {
      case 'active':
        if (
          sub.values.Status === 'Completed' ||
          sub.values.Status === 'Resolved'
        )
          return false;
        break;
      case 'mine':
        if (sub.values.Assignee !== userProfile.displayName) return false;
      case 'mine-unassigned':
        if (
          sub.values.Assignee !== userProfile.displayName &&
          sub.values.Assignee
        )
          return false;
      case 'all':
      default:
        break;
    }

    // Filter by Label Client Select
    if (
      selectClientValue !== 'all' &&
      sub.values['Organization'] !== selectClientValue
    )
      return false;

    // Filter submissions by generic text filter
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

  // sort submissions according to state.criteria & state.ascending
  const sortedSubmissions = filteredSubmissions?.sort((a, b) => {
    const { criteria, ascending } = sortOptions;
    a = sortMap[criteria]?.[a.values[criteria]] || a.values[criteria];
    b = sortMap[criteria]?.[b.values[criteria]] || b.values[criteria];

    if (a === b) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    if (ascending) {
      return a < b ? -1 : 1;
    } else {
      return a > b ? -1 : 1;
    }
  });

  // Calculate pagination and build page number array
  const paginatedSubmissions = sortedSubmissions?.slice(
    pageStart,
    pageStart + perPage,
  );
  const pages = Math.ceil(sortedSubmissions?.length / perPage);
  const pageArr = [];
  for (let i = 0; i < pages; i++) {
    pageArr.push(i + 1);
  }

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

  // fetch form data and search submissions when mounted
  useEffect(() => {
    defaultSearch();

    fetchForm({
      kappSlug: kapp,
      formSlug: form,
      include: 'fields,details',
      export: true,
    })
      .then(({ form }) => {
        console.log('form', form);
        setFields(form.pages[0].elements.filter(el => el.type === 'field'));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card-wrapper">
      <div className="table-header">
        {label ? (
          <span className="table-title">{label}</span>
        ) : (
          <div style={{ transform: 'scale(1.5)', transformOrigin: 'left top' }}>
            <FormControl variant="standard" size="large">
              <Select
                id="table-header-select"
                value={selectValue}
                onChange={e => setSelectValue(e.target.value)}
                sx={{ marginRight: '10px' }}
              >
                <MenuItem value="active">Active Tickets</MenuItem>
                <MenuItem value="mine">My Tickets</MenuItem>
                <MenuItem value="mine-unassigned">Mine/Unassigned</MenuItem>
                <MenuItem value="all">All Tickets</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" size="large">
              <Select
                id="table-header-select"
                value={selectClientValue}
                onChange={e => setSelectClientValue(e.target.value)}
              >
                <MenuItem value="all">All Clients</MenuItem>
                {clientNames.map(org => (
                  <MenuItem key={org} value={org}>
                    {org}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            {/* Conditional Header Rendering, based on state.visible */}
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
                      <span>
                        {filterOptions[f] && (
                          <i
                            className="fa fa-filter"
                            onClick={() => {
                              // remove column from filterOptions
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
              <span className="header-icon-container">
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
                console.log(fields);
                const type = fields.find(field => field.name == f)?.renderType;
                console.log('type', type);
                switch (type) {
                  case 'dropdown':
                    if (
                      fields.find(field => field.name == f).choices.length > 0
                    )
                      return (
                        <th key={f}>
                          <select
                            value={filterOptions[f] || ''}
                            onChange={e => {
                              setFilterOptions({
                                ...filterOptions,
                                [f]: e.target.value,
                              });
                            }}
                          >
                            <option value="">All</option>
                            {fields
                              .find(field => field.name == f)
                              .choices.map(choice => {
                                return (
                                  <option
                                    key={choice.value}
                                    value={choice.value}
                                  >
                                    {choice.label}
                                  </option>
                                );
                              })}
                          </select>
                        </th>
                      );
                  case 'date':
                    // return (
                    //   <th key={f}>
                    //     <input
                    //       type="date"
                    //       value={filterOptions[f] || ''}
                    //       onChange={e => {
                    //         setFilterOptions({
                    //           ...filterOptions,
                    //           [f]: e.target.value,
                    //         });
                    //       }}
                    //     />
                    //   </th>
                    // );
                    return <th key={f} />;
                  case 'text':
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
                  default:
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
                }
              })}
            </tr>
          )}
        </thead>
        <tbody>
          {paginatedSubmissions?.map((submission, i) => {
            const id = submission.id;
            return (
              <tr key={i} onClick={() => handleRowClick(id)}>
                {visible.map(f => {
                  let content;
                  if (typeof f == 'object') {
                    content = JSON.parse(f);
                  } else if (
                    !Number(submission.values[f]) &&
                    Date.parse(submission.values[f])
                  ) {
                    content = format(submission.values[f], dateFormat);
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
          {paginatedSubmissions?.length < 1 && (
            <tr>
              <td className="no-ticket-msg" colSpan="100%">
                No Tickets to Display
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Options */}
      {/* <select name="pagination-number"
        value={perPage}
        onChange={(e) => setPerPage(e.target.value)}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select> */}

      <div className="pagination-controls">
        <div className="pagination-controls--links">
          {pageArr.map((el, i) => {
            const page = Math.floor(pageStart / perPage);
            return (
              <a
                key={i}
                onClick={() => setPageStart((Number(el) - 1) * perPage)}
                className={page == i ? 'selected' : ''}
              >
                {el}
              </a>
            );
          })}
        </div>
        <div className="per-page-input-container">
          <label htmlFor="per-page__input">Tickets Per Page: </label>
          <input
            type="number"
            id="per-page__input"
            value={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
          />
        </div>
      </div>

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
