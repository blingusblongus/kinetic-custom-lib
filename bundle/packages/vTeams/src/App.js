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
import Dashboard from './components/Dashboard/Dashboard';
import FormView from './components/FormView/FormView';
import ClientOverview from './components/ClientOverview/ClientOverview';
import Reports from './components/Reports/Reports';

import { SLUGS, NAMES } from '../globals/globals';
import { SubmissionSearch } from '@kineticdata/react';
import { useDispatch, useSelector } from 'react-redux';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';
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

  const dispatch = useDispatch();
  const userProfile = useSelector(store => store.app.profile);
  const fulfiller = isMemberOf(userProfile, 'vTeams');
  const organization = userProfile.attributes.find(
    attr => attr.name === NAMES.ATTRIBUTE_ORGANIZATION,
  )?.values[0];

  // Load inter font for just custom app
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Inter:300,400,500,700,900'],
      },
    });

    // configure search for specific tickets if !fulfiller, else fetch all
    //'FETCH_TICKETS' returns paginated results
    //'FETCH_TICKETS_ALL' returns non-paginated (collected) results
    const ticketSearch = fulfiller
      ? new SubmissionSearch().include('values').build()
      : new SubmissionSearch()
          .eq('values[Organization]', organization)
          .include('values')
          .build();

    const settingsSearch = new SubmissionSearch().include('values').build();

    dispatch({
      type: 'FETCH_TICKETS',
      payload: {
        kapp: SLUGS.KAPPSLUG,
        form: SLUGS.TICKET_FORM_SLUG,
        search: ticketSearch,
      },
    });

    dispatch({
      type: 'FETCH_SETTINGS',
      payload: {
        kapp: SLUGS.KAPPSLUG,
        form: 'user-settings',
        search: settingsSearch,
      },
    });

    // Client-specific fetches
    if (!fulfiller) {
      const workLogSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .eq('values[isWorkLog]', 'true')
        .include('values')
        .build();

      dispatch({
        type: 'FETCH_WORKLOGS',
        payload: {
          kapp: SLUGS.KAPPSLUG,
          form: SLUGS.ACTIVITIES_FORM_SLUG,
          search: workLogSearch,
        },
      });

      const clientSearch = new SubmissionSearch()
        .eq('values[Organization]', organization)
        .include('values')
        .build();

      dispatch({
        type: 'FETCH_ORGANIZATION',
        payload: {
          kapp: SLUGS.KAPPSLUG,
          form: SLUGS.CLIENTS_FORM_SLUG,
          search: clientSearch,
        },
      });
    }
  }, []);

  if (props.error) {
    return <ErrorUnexpected />;
  } else if (props.loading) {
    return <Loading text="App is loading ..." />;
  } else {
    return props.render({
      main: (
        <I18n>
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
                  <ClientOverview path="/clients" />
                  <Reports path="/reports" />
                </Router>
              </div>
            </div>
          </ThemeProvider>
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
