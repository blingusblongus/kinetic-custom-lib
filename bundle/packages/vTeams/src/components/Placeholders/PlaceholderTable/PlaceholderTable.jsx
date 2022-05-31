import React, { useState } from 'react';
import TeamsButton from '../../TeamsButton/TeamsButton';
import './PlaceholderTable.scss';

const PlaceholderTable = () => {
  const rows = new Array(10).fill(1);

  return (
    <div className="card-wrapper">
      <div className="table-header">
        <span className="table-title">Active Tickets</span>
        <TeamsButton>A Button</TeamsButton>
      </div>
      <table>
        <thead>
          <tr>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((el, i) => (
            <tr key={i}>
              <td> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaceholderTable;
