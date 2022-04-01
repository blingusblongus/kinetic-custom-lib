import React from 'react';
import { Redirect, Router } from '@reach/router';
import { compose, lifecycle } from 'recompose';
import {
  ErrorUnexpected,
  Loading,
  PageTitle,
} from '@kineticdata/bundle-common';
import { connect } from './redux/store';
import { I18n } from '@kineticdata/react';

import { useSelector } from './redux/hooks/hooks';

import { Home } from './components/Home';
import Navbar from './components/Navbar/Navbar';
/*****************************************************************************
 *** PRIVATE APP
 *****************************************************************************/

const AppComponent = props => {
  const kapp = useSelector(store => store.app.kapp);

  console.log('app', useSelector(store => store));

  if (props.error) {
    return <ErrorUnexpected />;
  } else if (props.loading) {
    return <Loading text="App is loading ..." />;
  } else {
    return props.render({
      main: (
        <I18n>
          <div className="package-layout package-layout--vteams">
            <PageTitle parts={['Loading...']} />
            <Navbar />
            <Router>
              <Home path="/" />
            </Router>
          </div>
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
