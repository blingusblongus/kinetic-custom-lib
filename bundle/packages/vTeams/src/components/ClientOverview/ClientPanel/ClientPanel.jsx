import React from 'react';
import { SLUGS, FORM_FIELDS } from '../../../../globals/globals';
import { history } from '@kineticdata/react';

const ClientPanel = ({ orgInfo }) => {
  const { logo, name, id } = orgInfo;
  const {
    BILLING_PERIOD,
    MONTHLY_HOURS,
    ANNUAL_HOURS,
    BILLING_START,
    HOURS_WORKED,
  } = FORM_FIELDS;

  console.log(orgInfo);
  return (
    <div className="burndown-panel">
      <div className="burndown-header">
        <img src={logo} alt={`${name} logo`} />
        <div className="burndown-organization">{name}</div>
      </div>
      <div className="burndown-body">
        <div className="burndown-item">
          <span className="burndown-item--header">Billing Period: </span>
          <span>{orgInfo[BILLING_PERIOD]}</span>
        </div>
        <div className="burndown-item">
          <span className="burndown-item--header">Billing Period Start:</span>
          <span>{orgInfo[BILLING_START]}</span>
        </div>
        <div className="burndown-item">
          <span className="burndown-item--header">Total Hours: </span>
          <span>{orgInfo[MONTHLY_HOURS] || orgInfo[ANNUAL_HOURS]}</span>
        </div>
        <div className="burndown-item">
          <span className="burndown-item--header">Hours Used: </span>
          <span>{orgInfo[HOURS_WORKED]}</span>
        </div>
        <div className="burndown-item">
          <span className="burndown-item--header">Hours Remaining: </span>
          <span>
            {(orgInfo[MONTHLY_HOURS] || orgInfo[ANNUAL_HOURS]) -
              orgInfo[HOURS_WORKED]}
          </span>
        </div>
      </div>
      <div
        className="burndown-footer"
        // onClick={()=>setModal({show: true, submissions})}
        onClick={() =>
          history.push(
            `/kapps/${SLUGS.KAPPSLUG}/forms/${SLUGS.CLIENTS_FORM_SLUG}/${id}`,
          )
        }
      >
        View Details
      </div>
    </div>
  );
};

export default ClientPanel;
