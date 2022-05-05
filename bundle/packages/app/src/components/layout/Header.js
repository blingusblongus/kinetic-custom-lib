import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AlertsDropdown } from './AlertsDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { SearchBar } from './SearchBar';
import { Utils } from '@kineticdata/bundle-common';

import logo from '../../assets/images/esolutions_logo_white.svg';
import URLS from 'vteams/globals/urls';

const HeaderComponent = props => (
  <>
    {props.mobile &&
      !props.hideSidebarToggle &&
      props.authenticated && (
        <button className="toggle" onClick={props.toggleSidebar}>
          <span className="fa fa-bars" />
        </button>
      )}
    {props.logo &&
      props.logo !== 'Disabled' && (
        <Link className="logo" to={URLS.CLIENT_HOME}>
          <img src={props.logo} alt="Logo" />
        </Link>
      )}

    <div className="mr-auto" aria-hidden="true" />

    {props.authenticated && <SearchBar modal={props.mobile} />}
    {props.authenticated && !props.alertsDisabled && <AlertsDropdown />}
    {props.authenticated && <ProfileDropdown />}
    {!props.authenticated && (
      <Link className="nav-link" to={props.authRoute} title="Sign In">
        <i className="fa fa-fw fa-sign-in" />
      </Link>
    )}
  </>
);

export const Header = connect(state => ({
  authenticated: state.app.authenticated,
  authRoute: state.app.authRoute,
  logo: Utils.getAttributeValue(state.app.space, 'Logo', logo),
  alertsDisabled: !Utils.getAttributeValue(state.app.space, 'Alerts Form Slug'),
}))(HeaderComponent);
