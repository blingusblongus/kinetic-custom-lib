import React from 'react';
import TeamsButton from '../TeamsButton/TeamsButton';
import './RecentlyViewed.scss';
import {
  bgColorPrimary,
  colorWhite,
} from '../../assets/styles/_variables.scss';

const RecentlyViewed = ({ tickets }) => {
  tickets = tickets || [
    {
      number: '#000342',
      date: new Date().toLocaleDateString().split('T')[0],
      description: 'a ticket',
      status: 'Completed',
    },
  ];
  return (
    <div className="recently-viewed card-wrapper">
      <header>
        <span>Recently Viewed</span>
        <TeamsButton
          mode="light"
          sx={{
            boxShadow: 'none',
            justifySelf: 'flex-end',
            '&:hover': {
              backgroundColor: bgColorPrimary,
              color: colorWhite,
            },
          }}
        >
          View All
        </TeamsButton>
      </header>
      <table>
        <thead>
          <th>Ticket Number</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
        </thead>
        <tbody>
          {tickets?.map(ticket => {
            const { number, date, description, status } = ticket;
            return (
              <tr key={number}>
                <td>{number}</td>
                <td>{date}</td>
                <td>{description}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyViewed;
