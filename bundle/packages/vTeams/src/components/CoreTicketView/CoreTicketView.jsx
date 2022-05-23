import React, { useState } from 'react';
import { CoreForm } from '@kineticdata/react';
import { SLUGS } from '../../../globals/globals.js';
import URL from '../../../globals/urls.js';
import TeamsButton from '../TeamsButton/TeamsButton.jsx';
import './_CoreTicketView.scss';
import Activities from '../Activities/Activities.jsx';

const CoreTicketView = ({ id }) => {
  const [submission, setSubmission] = useState({});

  const header = id ? (
    <h1>Ticket Handle: {id.substr(id.length - 6)}</h1>
  ) : (
    <h1>Submit a Ticket</h1>
  );

  return (
    <div className="page-panel">
      {header}

      <div className="card-wrapper no-padding">
        <CoreForm
          submission={id || submission.id}
          kapp={SLUGS.KAPPSLUG}
          form={SLUGS.TICKET_FORM_SLUG}
          onCompleted={e => setSubmission(e.submission)}
          components={{
            Button: TeamsButton,
          }}
        />
      </div>

      {// After form submission success, prompt return to CLIENT_HOME
      !id &&
        submission.handle && (
          <>
            <div className="flex flex-center">
              Your Ticket Has Been Successfully Submitted.
            </div>
            <div className="flex flex-center">
              <TeamsButton mode="dark" linkpath={URL.CLIENT_HOME}>
                Back to Home
              </TeamsButton>
            </div>
          </>
        )}

      {//if existing form, show comments
      (id || submission.id) && <Activities id={id || submission.id} />}
    </div>
  );
};

export default CoreTicketView;
