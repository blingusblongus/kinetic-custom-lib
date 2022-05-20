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

import CoreTicket from './components/CoreTicketView/CoreTicketView';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import Dashboard from './components/Dashboard/Dashboard';
import FormView from './components/FormView/FormView';
import BurndownFulfiller from './components/BurndownFulfiller/BurndownFulfiller';
import './App.scss';

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
                <div className="page-container">
                  <Router>
                    <FormView path="/forms/:formSlug" />
                    <FormView path="/forms/:formSlug/:submissionId" />
                    <Redirect from="/" to="/kapps/vteams/home" noThrow />
                    <CoreTicket path="/ticket" />
                    <CoreTicket path="/ticket/:id" />
                    <Dashboard path="/home" />
                    <BurndownFulfiller path="/clients" />
                  </Router>
                </div>
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
