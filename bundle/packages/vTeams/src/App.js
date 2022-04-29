import React, { useEffect } from 'react';
import { Redirect, Router } from '@reach/router';
import { compose, lifecycle } from 'recompose';
import {
  ErrorUnexpected,
  Loading,
  PageTitle,
} from '@kineticdata/bundle-common';
import { connect } from './redux/store';
import { I18n } from '@kineticdata/react';

import WebFont from 'webfontloader';
import { ThemeProvider, createTheme } from '@mui/material';

import { Home } from './components/Home';
import Navbar from './components/Navbar/Navbar';
import './App.scss';
import BreadCrumbContainer from './components/BreadCrumbs/BreadCrumbs';
import TicketSubmission from './components/TicketSubmission/TicketSubmission';
// import Dashboard from './components/Dashboard/Dashboard';
import Dashboard from './components/Dashboard_v2/DashboardV2';
import TicketUserView from './components/TicketUserView./TicketUserView';
import Queue from './components/Queue/Queue';
import { Footer } from './components/Footer/Footer';
import ClientManagement from './components/ClientManagement/ClientManagement';
import CoreTicket from './components/CoreTicketView/CoreTicketView';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import ClientHome from './components/ClientHome/ClientHome';
import DashboardV1 from './components/Dashboard/Dashboard';

/*****************************************************************************
 *** PRIVATE APP
 *****************************************************************************/

const AppComponent = props => {
  const THEME = createTheme({
    typography: {
      fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 12,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  // Load inter font for just custom app
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Inter:300,400,500,700,900'],
      },
    });
  }, []);

  if (props.error) {
    return <ErrorUnexpected />;
  } else if (props.loading) {
    return <Loading text="App is loading ..." />;
  } else {
    return props.render({
      main: (
        <I18n>
          <Provider store={store}>
            <ThemeProvider theme={THEME}>
              <div className="package-layout package-layout--vteams">
                <PageTitle parts={['Loading...']} />
                {/* <Navbar /> */}
                <div className="page-container">
                  {/* <BreadCrumbContainer /> */}
                  <Router>
                    {/* <TicketSubmission path="/" /> */}
                    <Redirect from="/" to="/kapps/vteams/dashboard" noThrow />
                    <Dashboard path="/dashboard" />
                    <DashboardV1 path="/dashboard/v1" />
                    <CoreTicket path="/ticket" />
                    <CoreTicket path="/ticket/:id" />
                    <TicketSubmission path="/ticket/draft" />
                    <Queue path="/queue" />
                    <ClientManagement path="/clients" />
                    <ClientHome path="/client/home" />
                  </Router>
                </div>
                <Footer />
              </div>
            </ThemeProvider>
          </Provider>
        </I18n>
      ),
    });
  }
};

const mapStateToProps = state => ({
  loading: false,
  error: null,
  appLocation: state.app.location,
});

const mapDispatchToProps = {};

export const App = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {},
  }),
)(AppComponent);

/*****************************************************************************
 *** PUBLIC APP
 *****************************************************************************/

export const PublicAppComponent = props => {
  return props.render({
    main: (
      <I18n>
        <div className="package-layout package-layout--scaffold">
          <PageTitle parts={['Loading...']} />
          <Router>
            <Redirect from="*" to={props.authRoute} noThrow />
          </Router>
        </div>
      </I18n>
    ),
  });
};

const mapStateToPropsPublic = state => ({
  authRoute: state.app.authRoute,
});

export const PublicApp = compose(connect(mapStateToPropsPublic))(
  PublicAppComponent,
);
