import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { ModalBody } from 'reactstrap';
import { actions } from '../../redux/modules/filterMenu';
import { DateRangeSelector } from 'common/src/components/DateRangeSelector';

const convertDateRangeValue = dateRange =>
  !dateRange.custom
    ? dateRange.preset
    : { start: dateRange.start, end: dateRange.end };

export const DateRangeSection = ({
  filter,
  errors,
  setDateRangeTimelineHandler,
  setDateRange,
}) => (
  <ModalBody className="filter-section">
    <h5>
      Date Range
      <br />
      {errors.get('Date Range') && (
        <small className="text-danger text-small">
          {errors.get('Date Range')}
        </small>
      )}
    </h5>
    <select
      value={filter.dateRange.timeline}
      onChange={setDateRangeTimelineHandler}
    >
      <option value="createdAt">Created At</option>
      <option value="updatedAt">Updated At</option>
      <option value="completedAt">Completed At</option>
    </select>
    <DateRangeSelector
      allowNone
      value={convertDateRangeValue(filter.dateRange)}
      onChange={setDateRange}
    />
  </ModalBody>
);

export const DateRangeSectionContainer = compose(
  connect(
    null,
    {
      setDateRangeTimeline: actions.setDateRangeTimeline,
      setDateRange: actions.setDateRange,
    },
  ),
  withHandlers({
    setDateRangeTimelineHandler: props => event =>
      props.setDateRangeTimeline(event.target.value),
  }),
)(DateRangeSection);
