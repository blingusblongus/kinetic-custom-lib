import React, { useState } from 'react';
import { CoreForm } from '@kineticdata/react';
import { VTEAMS } from '../../../globals/globals.js';
import URL from '../../../globals/urls.js';
import TeamsButton from '../TeamsButton/TeamsButton.jsx';
import './_CoreTicketView.scss';
import Activities from '../Activities/Activities.jsx';

const CoreTicketView = ({ id }) => {
  const [submission, setSubmission] = useState({});
  // if (!id) id = '0bfdda56-c013-11ec-b72e-299adb97fb02';
  console.log(id);

  return (
    <div className="page-panel">
      <div className="card-wrapper no-padding">
        <CoreForm
          submission={id || submission.id}
          kapp={VTEAMS.KAPPSLUG}
          form={VTEAMS.TICKET_FORM_SLUG}
          onCompleted={e => setSubmission(e.submission)}
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

      <Activities id={id} />
    </div>
  );
};

export default CoreTicketView;
