import React from 'react';
import { compose, withHandlers } from 'recompose';
import { actions } from '../../redux/modules/filterMenu';
import { I18n } from '@kineticdata/react';
import { connect } from '../../redux/store';

export const CreatedByMe = ({ filter, toggleCreatedByMeHandler }) => (
  <button
    type="button"
    className="btn btn-link"
    onClick={toggleCreatedByMeHandler}
  >
    <span className="button-title">
      <I18n>Created By Me</I18n>
    </span>
    <span>
      <input
        type="checkbox"
        id={`filter-created-by-me`}
        value={filter.createdByMe}
        checked={filter.createdByMe}
        onChange={toggleCreatedByMeHandler}
      />
    </span>
  </button>
);

export const CreatedByMeContainer = compose(
  connect(
    null,
    {
      toggleCreatedByMe: actions.toggleCreatedByMe,
    },
  ),
  withHandlers({
    toggleCreatedByMeHandler: props => event =>
      props.toggleCreatedByMe(!props.filter.createdByMe),
  }),
)(CreatedByMe);
