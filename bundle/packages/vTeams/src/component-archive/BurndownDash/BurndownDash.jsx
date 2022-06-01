import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isFulfiller } from '../../lib/utils';
import { SubmissionSearch, searchSubmissions } from '@kineticdata/react';
import './_BurndownDash.scss';

const BurndownDash = () => {
  // Used for fulfiller view
  const [clients, setClients] = useState([]);
  // Used for client view
  const [client, setClient] = useState({});

  // Determine which view to render
  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isFulfiller(userProfile);

  useEffect(() => {
    // fill clients array or client obj, depending on fulfiller status
    let search = new SubmissionSearch().include('values').build();
    searchSubmissions({ kapp: 'vteams', form: 'clients', search })
      .then(
        result =>
          fulfiller
            ? setClients(result.submissions)
            : setClient(result.submissions[0]),
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Burndown</h1>
      {fulfiller ? (
        <div className={`burndown-display grid ${fulfiller && 'fulfiller'}`}>
          {clients.map(client => {
            return (
              <>
                <span className="font-bold">{client.values.Organization}:</span>
                <span>Monthly Hours: {client.values['Monthly Hours']}</span>
                <span>Hours Remaining: {client.values['Hours Remaining']}</span>
              </>
            );
          })}
        </div>
      ) : (
        <div>
          <p>
            Total Hours:{' '}
            {client.values ? client.values['Monthly Hours'] : 'No Data'}
          </p>
          <p>
            Hours Remaining:{' '}
            {client.values ? client.values['Hours Remaining'] : 'No Data'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BurndownDash;
