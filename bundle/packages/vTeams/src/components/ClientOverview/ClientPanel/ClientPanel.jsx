import React from 'react';
import { SLUGS, FORM_FIELDS } from '../../../../globals/globals';
import { history } from '@kineticdata/react';
import ClientPanelItem from './ClientPanelItem';

const ClientPanel = ({ orgInfo }) => {
  const { logo, name, id } = orgInfo;
  const {
    BILLING_PERIOD,
    MONTHLY_HOURS,
    ANNUAL_HOURS,
    BILLING_START,
    HOURS_WORKED,
  } = FORM_FIELDS;

  const totalHours = orgInfo[MONTHLY_HOURS] || orgInfo[ANNUAL_HOURS];
  const hoursRemaining = totalHours - orgInfo[HOURS_WORKED];

  return (
    <div className="burndown-panel">
      <div className="burndown-header">
        <img src={logo} alt={`${name} logo`} />
        <div className="burndown-organization">{name}</div>
      </div>
      <div className="burndown-body">
        <ClientPanelItem
          label="Billing Period"
          value={orgInfo[BILLING_PERIOD]}
        />
        <ClientPanelItem
          label="Billing Period Start"
          value={orgInfo[BILLING_START]}
        />
        <ClientPanelItem label="Total Hours" value={totalHours} />
        <ClientPanelItem label="Hours Used" value={orgInfo[HOURS_WORKED]} />
        <ClientPanelItem label="Hours Remaining" value={hoursRemaining} />
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
