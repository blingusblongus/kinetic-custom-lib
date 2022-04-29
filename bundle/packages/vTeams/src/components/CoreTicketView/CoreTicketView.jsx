import React, { useState } from 'react';
import { CoreForm } from '@kineticdata/react';
import { VTEAMS } from '../../../globals/globals.js';
import URL from '../../../globals/urls.js';
import TeamsButton from '../TeamsButton/TeamsButton.jsx';
import './_CoreTicketView.scss';
import Activities from '../Activities/Activities.jsx';

const CoreTicketView = ({ id }) => {
  const [submission, setSubmission] = useState({});
  return (
    <div className="page-panel">
      <div className="card-wrapper no-padding">
        <CoreForm
          submission={id || submission.id}
          kapp={VTEAMS.KAPPSLUG}
          form={VTEAMS.TICKET_FORM_SLUG}
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

      {
        //if existing form, show comments
        <Activities id={id} />
      }
    </div>
  );
};

export default CoreTicketView;
