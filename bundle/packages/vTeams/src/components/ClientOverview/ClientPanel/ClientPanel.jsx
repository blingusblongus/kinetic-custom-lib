import React from 'react';
import { SLUGS, FORM_FIELDS } from '../../../../globals/globals';
import { history } from '@kineticdata/react';

const ClientPanel = ({ orgInfo }) => {
  const { logo, name, id } = orgInfo;
  console.log(logo);
  return (
    <div className="burndown-panel">
      <div className="burndown-header">
        <img src={logo} alt={`${name} logo`} />
        <div className="burndown-organization">{name}</div>
      </div>
      <div className="burndown-body">
        <div className="burndown-item">
          <span className="burndown-item--header">Total Hours: </span>
          <span>{orgInfo[FORM_FIELDS.MONTHLY_HOURS]}</span>
        </div>
        <div className="burndown-item">
          <span className="burndown-item--header">Hours Used: </span>
          <span>{orgInfo[FORM_FIELDS.HOURS_WORKED]}</span>
        </div>
        <div className="burndown-item">
          <span className="burndown-item--header">Hours Remaining: </span>
          <span>
            {orgInfo[FORM_FIELDS.MONTHLY_HOURS] -
              orgInfo[FORM_FIELDS.HOURS_WORKED]}
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
