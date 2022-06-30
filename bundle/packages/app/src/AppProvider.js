import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  CommonProvider,
  ErrorMessage,
  LoadingMessage,
  ModalFormContainer,
  ToastsContainer,
} from '@kineticdata/bundle-common';
import { parse } from 'query-string';
import { I18n } from '@kineticdata/react';

import { PageTitle } from './components/shared/PageTitle';
import { Home } from './components/home/Home';
import { SearchResults } from './components/SearchResults';
import { Kapp } from './components/Kapp';
import { Submissions } from './components/Submissions';
import { Form } from './components/Form';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile';
import { TeamsNavigation } from './components/Teams';
import { About } from './components/About';
import { Alerts } from './components/alerts/Alerts';
import { Alert } from './components/alerts/Alert';
import SettingsApp from '@kineticdata/bundle-settings';

const AppComponent = props => {
  return props.render({
    main:
      props.errors.size > 0 ? (
        <ErrorMessage
          title="Unexpected Error"
          message="Sorry, an unexpected error has occurred!"
        />
      ) : props.loading ? (
        <LoadingMessage />
      ) : (
        <I18n>
          <main className={`package-layout package-layout--app`}>
            <PageTitle parts={['Loading...']} />
            <Switch>
              <Redirect path="/" to="/kapps/vteams/" exact />
              <Route exact path="/kapps/:kappSlug" component={Kapp} />
              <Route
                exact
                path="/kapps/:kappSlug/forms/:formSlug"
                component={Form}
              />
              <Route
                exact
                path="/kapps/:kappSlug/forms/:formSlug/submissions/:id"
                component={Form}
              />
              <Route
                exact
                path="/kapps/:kappSlug/forms/:formSlug/submissions"
                component={Submissions}
              />

              <Route exact path="/search/:query?" component={SearchResults} />
              <Route exact path="/profile/edit" component={EditProfile} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route path="/teams" component={TeamsNavigation} />
              <Route exact path="/about" component={About} />
              <Route exact path="/alerts/:id" component={Alert} />
              <Route exact path="/alerts" component={Alerts} />
              <Redirect
                path="/datastore/forms/:formSlug/submissions/:id"
                to={`${SettingsApp.location}/datastore/:formSlug/:id`}
              />
              <Redirect
                path="/datastore/forms/:formSlug"
                to={`${SettingsApp.location}/datastore/:formSlug/new`}
              />
              <Redirect
                path="/forms/:formSlug/submissions/:id"
                to={`${SettingsApp.location}/datastore/:formSlug/:id`}
              />
              <Redirect
                path="/forms/:formSlug"
                to={`${SettingsApp.location}/datastore/:formSlug/new`}
              />
              <Redirect default path="/" to="/kapps/vteams/" />
            </Switch>
          </main>
        </I18n>
      ),
  });
};

const PublicAppComponent = props => {
  return props.render({
    main: (
      <I18n>
        <main className={`package-layout package-layout--app`}>
          <PageTitle parts={['Loading...']} />
          <Switch>
            {props.kapp && (
              <Route
                exact
                path="/kapps/:kappSlug/forms/:formSlug"
                component={Form}
              />
            )}
            {props.kapp && (
              <Route
                exact
                path="/kapps/:kappSlug/forms/:formSlug/submissions/:id"
                component={Form}
              />
            )}
            <Redirect path="/" to={props.authRoute} />
          </Switch>
        </main>
      </I18n>
    ),
  });
};

const mapStateToProps = (state, props) => ({
  loading: state.app.loading,
  errors: state.app.errors,
  kapp: state.app.kapp,
  authRoute: state.app.authRoute,
  location: state.router.location,
});

export const App = connect(mapStateToProps)(AppComponent);
export const PublicApp = connect(mapStateToProps)(PublicAppComponent);

export class AppProvider extends Component {
  render() {
    return (
      <CommonProvider>
        <ToastsContainer duration={5000} />
        <ModalFormContainer />
        {this.props.appState.authenticated ? (
          <App
            render={this.props.render}
            path={`${this.props.appState.location}/*`}
          />
        ) : (
          <PublicApp
            render={this.props.render}
            path={`${this.props.appState.location}/*`}
          />
        )}
      </CommonProvider>
    );
  }

  // Used for matching pathname to display this App
  // Not used if package is set as Bundle Package of a Kapp
  static location = '/';

  static hasPublicRoutes = true;

  static shouldHideHeader = ({ location }) =>
    parse(location.search).public !== undefined;

  static shouldHideSidebar = ({ location }) =>
    parse(location.search).public !== undefined;
}
