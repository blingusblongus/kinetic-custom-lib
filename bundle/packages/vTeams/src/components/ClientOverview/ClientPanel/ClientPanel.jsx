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
    COMBINED_HOURS,
    CARRYOVER_TYPE,
    CARRYOVER_HOURS,
    PERCENTAGE_CARRYOVER,
    FIXED_CARRYOVER,
  } = FORM_FIELDS;

  const periodHours = orgInfo[MONTHLY_HOURS] || orgInfo[ANNUAL_HOURS];
  const totalHours =
    Number(periodHours) + Number(orgInfo[CARRYOVER_HOURS] || 0);
  const hoursRemaining = totalHours - orgInfo[HOURS_WORKED];

  let carryoverItem;
  switch (orgInfo[CARRYOVER_TYPE]) {
    case 'Percentage':
      carryoverItem = (
        <ClientPanelItem
          label="Carryover Rule"
          value={`${orgInfo[PERCENTAGE_CARRYOVER]}%`}
        />
      );
      break;
    case 'Fixed':
      carryoverItem = (
        <ClientPanelItem
          label="Carryover Rule"
          value={`${orgInfo[FIXED_CARRYOVER]} hours`}
        />
      );
      break;
    case 'None':
      break;
    default:
      carryoverItem = (
        <ClientPanelItem label="Carryover Rule" value={`Not Set`} />
      );
  }

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
        <ClientPanelItem label="Billing Period Hours" value={periodHours} />
        {carryoverItem}
        <ClientPanelItem
          label="Hours Carried Over"
          value={orgInfo[CARRYOVER_HOURS] || 0}
        />
        <ClientPanelItem label="Total Hours" value={totalHours} />
        <ClientPanelItem label="Hours Used" value={orgInfo[HOURS_WORKED]} />
        <ClientPanelItem label="Hours Remaining" value={hoursRemaining} />
      </div>
      <div
        className="burndown-footer"
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
