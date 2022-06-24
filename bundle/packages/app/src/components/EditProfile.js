import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import { Link } from 'react-router-dom';
import {
  Card,
  CardRow,
  TeamCard,
  EmptyMessage,
  ErrorMessage,
  LoadingMessage,
  Utils,
  openModalForm,
  selectVisibleKapps,
} from '@kineticdata/bundle-common';
import { actions } from '../redux/modules/profile';
import { PageTitle } from './shared/PageTitle';
import { I18n } from '@kineticdata/react';

export const EditProfileComponent = ({
  profile,
  error,
  editingPassword,
  fieldValues,
  department,
  departmentEnabled,
  organization,
  organizationEnabled,
  site,
  siteEnabled,
  defaultKappDisplayEnabled,
  manager,
  managerEnabled,
  handleChangeManagerClick,
  handleFieldChange,
  handleSubmit,
  handleTogglePassword,
  visibleKapps,
  locales,
  timezones,
}) => (
  <div className="page-container">
    {!error && !profile && <LoadingMessage />}
    {error && (
      <ErrorMessage title="Could not load profile" message={error.message} />
    )}
    {profile && (
      <Fragment>
        <div className="page-panel">
          <PageTitle
            parts={['Edit Profile']}
            breadcrumbs={[
              { label: 'Home', to: '/' },
              {
                label: 'Profile',
                to: `/profile/${encodeURIComponent(profile.username)}`,
              },
            ]}
            title="Edit Profile"
          />
          <section>
            <h2 className="section__title">
              <span className="title">
                <I18n>General</I18n>
              </span>
            </h2>
            <form onSubmit={handleSubmit} className="form-unstyled">
              <div className="form-group required">
                <label htmlFor="displayName">
                  <I18n>Display Name</I18n>
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  onChange={handleFieldChange}
                  value={fieldValues.displayName}
                />
              </div>
              <div className="profile-input-container row">
                <div className="form-group required col-md-6">
                  <label htmlFor="email">
                    <I18n>Email</I18n>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleFieldChange}
                    value={fieldValues.email}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="phoneNumber">
                    <I18n>Phone Number</I18n>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={handleFieldChange}
                    value={fieldValues.phoneNumber}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="preferredLocale">Preferred Locale</label>
                  <select
                    type="text"
                    id="preferredLocale"
                    name="preferredLocale"
                    className="form-control"
                    onChange={handleFieldChange}
                    value={fieldValues.preferredLocale}
                  >
                    <option value="">None Selected</option>
                    {locales.map(locale => (
                      <option
                        value={locale.code}
                        key={`${locale.code}+${locale.name}`}
                      >
                        {locale.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="timezone">Timezone</label>
                  <select
                    type="text"
                    id="timezone"
                    name="timezone"
                    className="form-control"
                    onChange={handleFieldChange}
                    value={fieldValues.timezone}
                  >
                    <option value="">None Selected</option>
                    {timezones.map(timezone => (
                      <option value={timezone.id} key={timezone.id}>
                        {timezone.name} ({timezone.id})
                      </option>
                    ))}
                  </select>
                </div>
                {/* {defaultKappDisplayEnabled && (
                  <div className="form-group col-md-6">
                    <label htmlFor="defaultKappDisplay">
                      <I18n>Default Kapp Display</I18n>
                    </label>
                    <I18n
                      render={translate => (
                        <select
                          className="form-control"
                          type="kapp"
                          id="defaultKappDisplay"
                          name="defaultKappDisplay"
                          onChange={handleFieldChange}
                          value={fieldValues.defaultKappDisplay}
                        >
                          <option value="" />
                          <option value="discussions">
                            {translate('Discussions')}
                          </option>
                          {visibleKapps.map(k => (
                            <option key={k.slug} value={k.slug}>
                              {translate(k.name)}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                )} */}
              </div>
              {editingPassword ? (
                <div>
                  <hr />
                  <div className="profile-input-container row">
                    <div className="form-group col">
                      <label htmlFor="newPassword" className="required">
                        <I18n>New Password</I18n>
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        onChange={handleFieldChange}
                        value={fieldValues.newPassword}
                      />
                    </div>
                    <div className="form-group col">
                      <label htmlFor="confirmPassword" className="required">
                        <I18n>Password Confirmation</I18n>
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleFieldChange}
                        value={fieldValues.confirmPassword}
                      />
                    </div>
                  </div>
                  {fieldValues.newPassword !== fieldValues.confirmPassword && (
                    <p className="form-alert">
                      <I18n>Passwords Must Match</I18n>
                    </p>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="btn btn-secondary btn-sm"
                    >
                      <I18n>Cancel Password Change</I18n>
                    </button>
                  </div>
                  <hr />
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="change-password btn btn-secondary btn-sm"
                  >
                    <I18n>Change Password</I18n>
                  </button>
                  <hr />
                </div>
              )}
              <div className="text-right">
                <button
                  type="submit"
                  disabled={!fieldValuesValid(fieldValues)}
                  className="btn btn-primary"
                >
                  {/* // TODO: Disable until a change is made. Save Changes */}
                  <I18n>Save Changes</I18n>
                </button>
              </div>
            </form>
          </section>

          {(managerEnabled ||
            siteEnabled ||
            departmentEnabled ||
            organizationEnabled) && (
            <section className="mt-5">
              <h2 className="section__title">
                <span className="title">
                  <I18n>User Attributes</I18n>
                </span>
              </h2>
              <div className="user-attributes-wrapper">
                <table className="table table--user-attributes">
                  <tbody>
                    {managerEnabled && (
                      <tr>
                        <td className="name">
                          <I18n>Manager</I18n>
                        </td>
                        <td>
                          {manager || (
                            <em>
                              <I18n>No Manager</I18n>
                            </em>
                          )}
                          <button
                            className="btn btn-link btn-sm"
                            onClick={handleChangeManagerClick}
                          >
                            <I18n>Change Manager</I18n>
                          </button>
                        </td>
                      </tr>
                    )}
                    {departmentEnabled && (
                      <tr>
                        <td className="name">
                          <I18n>Department</I18n>
                        </td>
                        <td>
                          {department || (
                            <em>
                              <I18n>No Department</I18n>
                            </em>
                          )}
                        </td>
                      </tr>
                    )}
                    {organizationEnabled && (
                      <tr>
                        <td className="name">
                          <I18n>Organization</I18n>
                        </td>
                        <td>
                          {organization || (
                            <em>
                              <I18n>No Organization</I18n>
                            </em>
                          )}
                        </td>
                      </tr>
                    )}
                    {siteEnabled && (
                      <tr>
                        <td className="name">
                          <I18n>Site</I18n>
                        </td>
                        <td>
                          {site || (
                            <em>
                              <I18n>No Site</I18n>
                            </em>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* <section className="mt-5">
            <h2 className="section__title">
              <span className="title">
                <I18n>Roles</I18n>
              </span>
            </h2>
            <div className="cards cards--fourths">
              {Utils.getRoles(profile).length > 0 ? (
                Utils.getRoles(profile).map(role => (
                  <Card key={role.slug} color="subtle">
                    <CardRow className="py-1">
                      <strong>
                        <I18n>{role.name}</I18n>
                      </strong>
                    </CardRow>
                  </Card>
                ))
              ) : (
                <EmptyMessage title="No Roles Assigned" />
              )}
            </div>
          </section>
          <section>
            <h2 className="section__title">
              <span className="title">
                <I18n>Teams</I18n>
              </span>
            </h2>
            <div className="cards">
              {Utils.getTeams(profile).length > 0 ? (
                Utils.getTeams(profile).map(team => (
                  <TeamCard key={team.slug} team={team} components={{ Link }} />
                ))
              ) : (
                <EmptyMessage title="No Teams Assigned" />
              )}
            </div>
          </section> */}
        </div>
      </Fragment>
    )}
  </div>
);

const fieldValuesValid = fieldValues =>
  fieldValues.displayName &&
  fieldValues.email &&
  fieldValues.newPassword === fieldValues.confirmPassword;

const buildProfile = (fieldValues, profile) => {
  const profileAttributesMap = {};
  profileAttributesMap['Phone Number'] = fieldValues.phoneNumber
    ? [fieldValues.phoneNumber]
    : [];
  profileAttributesMap['Default Kapp Display'] = fieldValues.defaultKappDisplay
    ? [fieldValues.defaultKappDisplay]
    : [];
  return {
    ...profile,
    displayName: fieldValues.displayName,
    email: fieldValues.email,
    preferredLocale: fieldValues.preferredLocale,
    timezone: fieldValues.timezone,
    profileAttributesMap,
  };
};

const translateProfileToFieldValues = profile => ({
  displayName: profile.displayName || '',
  email: profile.email || '',
  preferredLocale: profile.preferredLocale || '',
  timezone: profile.timezone || '',
  newPassword: '',
  confirmPassword: '',
  phoneNumber: Utils.getProfileAttributeValue(profile, 'Phone Number', ''),
  defaultKappDisplay: Utils.getProfileAttributeValue(
    profile,
    'Default Kapp Display',
    '',
  ),
});

const translateFieldValuesToProfile = (fieldValues, profile) => {
  const updatedProfile = buildProfile(fieldValues, profile);
  const result = {
    displayName: updatedProfile.displayName,
    email: updatedProfile.email,
    preferredLocale:
      updatedProfile.preferredLocale === ''
        ? null
        : updatedProfile.preferredLocale,
    timezone: updatedProfile.timezone === '' ? null : updatedProfile.timezone,
    profileAttributesMap: updatedProfile.profileAttributesMap,
  };
  if (fieldValues.newPassword !== '') {
    result.password = fieldValues.newPassword;
  }
  return result;
};

const openChangeManagerForm = ({
  adminKappSlug,
  changeManagerFormSlug,
}) => config => {
  openModalForm({
    kappSlug: adminKappSlug,
    formSlug: changeManagerFormSlug,
    title: 'Change Manager',
    confirmationMessage: 'Your request has been submitted.',
  });
};

const selectAttributes = profile =>
  profile
    ? {
        departmentEnabled: Utils.hasAttributeDefinition(
          profile.space.userAttributeDefinitions,
          'Department',
        ),
        department: Utils.getAttributeValue(profile, 'Department'),
        managerEnabled: Utils.hasAttributeDefinition(
          profile.space.userAttributeDefinitions,
          'Manager',
        ),
        manager: Utils.getAttributeValue(profile, 'Manager'),
        organizationEnabled: Utils.hasAttributeDefinition(
          profile.space.userAttributeDefinitions,
          'Organization',
        ),
        organization: Utils.getAttributeValue(profile, 'Organization'),
        siteEnabled: Utils.hasAttributeDefinition(
          profile.space.userAttributeDefinitions,
          'Site',
        ),
        site: Utils.getAttributeValue(profile, 'Site'),
        defaultKappDisplayEnabled: Utils.hasAttributeDefinition(
          profile.space.userProfileAttributeDefinitions,
          'Default Kapp Display',
        ),
        defaultKappDisplay: Utils.getAttributeValue(
          { attributes: profile.profileAttributes },
          'Default Kapp Display',
        ),
      }
    : {};

const mapStateToProps = state => ({
  visibleKapps: selectVisibleKapps(state),
  locales: state.app.locales,
  timezones: state.app.timezones,
  profile: state.profile.data,
  error: state.profile.error,
  ...selectAttributes(state.profile.data),
  adminKappSlug: Utils.getAttributeValue(
    state.app.space,
    'Admin Kapp Slug',
    'admin',
  ),
  changeManagerFormSlug: Utils.getAttributeValue(
    state.app.space,
    'Change Manager Form Slug',
    'change-manager-request',
  ),
});

const mapDispatchToProps = {
  fetchProfileRequest: actions.fetchProfileRequest,
  updateProfileRequest: actions.updateProfileRequest,
};

export const EditProfile = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('editingPassword', 'setEditingPassword', false),
  withState('fieldValues', 'setFieldValues', translateProfileToFieldValues({})),
  withHandlers({
    handleChangeManagerClick: openChangeManagerForm,
    handleFieldChange: props => ({ target: { name, value } }) => {
      name && props.setFieldValues({ ...props.fieldValues, [name]: value });
    },
    handleTogglePassword: props => event => {
      props.setEditingPassword(!props.editingPassword);
      props.setFieldValues({
        ...props.fieldValues,
        newPassword: '',
        confirmPassword: '',
      });
    },
    handleSubmit: props => event => {
      event.preventDefault();
      props.updateProfileRequest(
        translateFieldValuesToProfile(props.fieldValues, props.profile),
      );
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchProfileRequest();
    },
    componentDidUpdate(prevProps) {
      if (this.props.profile && prevProps.profile !== this.props.profile) {
        this.props.setFieldValues({
          ...prevProps.fieldValues,
          ...translateProfileToFieldValues(this.props.profile),
        });
      }
    },
  }),
)(EditProfileComponent);
