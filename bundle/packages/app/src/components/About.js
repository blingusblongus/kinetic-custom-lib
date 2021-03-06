import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, TimeAgo } from '@kineticdata/bundle-common';
import { actions } from '../redux/modules/about';
import { I18n } from '@kineticdata/react';
import { PageTitle } from './shared/PageTitle';

const AboutComponent = ({ space, users, teams, loading }) => (
  <div className="page-container">
    {!loading && (
      <div className="page-panel">
        <PageTitle
          parts={['About']}
          breadcrumbs={[{ label: 'Home', to: '/' }]}
          title="About My Space"
        />
        <div className="page-content">
          <section>
            <h2 className="section__title">
              <span className="title">
                <I18n>General</I18n>
              </span>
            </h2>
            <div className="data-list-row">
              <dl className="data-list-row__col">
                <dt>
                  <I18n>Space Name</I18n>
                </dt>
                <dd>{space.name}</dd>
              </dl>

              <dl className="data-list-row__col">
                <dt>
                  <I18n>User Base</I18n>
                </dt>
                <dd>
                  {users && (
                    <I18n
                      render={translate =>
                        `${users.length} ${translate('users')}`
                      }
                    />
                  )}
                  {users &&
                    teams && (
                      <I18n render={translate => ` ${translate('in')} `} />
                    )}
                  {teams && (
                    <I18n
                      render={translate =>
                        `${teams.length} ${translate('teams')}`
                      }
                    />
                  )}
                </dd>
              </dl>

              <dl className="data-list-row__col">
                <dt>
                  <I18n>Created At</I18n>
                </dt>
                <dd>
                  <TimeAgo timestamp={space.createdAt} id={space.slug} />
                </dd>
              </dl>
            </div>
          </section>
          {users && (
            <section className="mt-4">
              <h2 className="section__title">
                <span className="title">
                  <I18n>Space Admins</I18n>
                </span>
              </h2>

              <table className="table table-responsive-sm">
                <thead>
                  <tr>
                    <th />
                    <th scope="col">
                      <I18n>Display Name</I18n>
                    </th>
                    <th scope="col">
                      <I18n>Email</I18n>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.spaceAdmin).map(user => (
                    <tr key={user.username}>
                      <td>
                        <Avatar username={user.username} />
                      </td>
                      <td>
                        <Link
                          to={`/profile/${encodeURIComponent(user.username)}`}
                        >
                          {user.displayName || user.username}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </div>
    )}
  </div>
);

const mapStateToProps = state => ({
  space: state.app.space,
  loading: state.about.loading,
  teams: state.about.teams,
  users: state.about.users,
});

const mapDispatchToProps = {
  fetchAboutRequest: actions.fetchAboutRequest,
};

export const About = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillMount() {
      this.props.fetchAboutRequest();
    },
  }),
)(AboutComponent);
