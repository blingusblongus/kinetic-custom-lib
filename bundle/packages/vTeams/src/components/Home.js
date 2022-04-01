import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from '../redux/store';
import TicketSubmission from './TicketSubmission/TicketSubmission';
import BreadCrumbContainer from './BreadCrumbs/BreadCrumbs';

const HomeComponent = props => {
  const demoTicket = {
    number: '0003492',
  };

  return (
    <div className="page-container">
      <div className="page-panel">
        <BreadCrumbContainer />
        <TicketSubmission ticket={demoTicket} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  appLocation: state.app.location,
});

const mapDispatchToProps = {};

export const Home = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {},
  }),
)(HomeComponent);
