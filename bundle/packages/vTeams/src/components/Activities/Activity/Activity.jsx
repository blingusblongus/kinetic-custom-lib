import React, { useState } from 'react';
import { isMemberOf } from '@kineticdata/bundle-common/lib/utils';
import { NAMES, FORM_FIELDS } from '../../../../globals/globals';
import './_Activity.scss';
import { useSelector } from 'react-redux';
import TeamsButton from '../../TeamsButton/TeamsButton';
import { updateSubmission, fetchSubmission } from '@kineticdata/react';

const Activity = ({ submission, reFetch, setReFetch }) => {
  const [loading, setLoading] = useState(false);
  let { values, submittedAt } = submission;
  const [date, time] = submittedAt.split('T');
  const [editMode, setEditMode] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    [FORM_FIELDS.HOURS_WORKED]: submission.values[FORM_FIELDS.HOURS_WORKED],
    [FORM_FIELDS.COMMENT]: submission.values[FORM_FIELDS.COMMENT],
  });
  const hours = submission.values[FORM_FIELDS.HOURS_WORKED];
  const comment = submission.values[FORM_FIELDS.COMMENT];
  const userProfile = useSelector(store => store.app.profile);

  //assign conditional classes to activity items
  const classes = [
    `${values.isFulfiller === 'true' && 'isFulfiller'}`,
    `${values.isInternal && 'isInternal'}`,
  ].join(' ');
  const showEdit = isMemberOf(userProfile, NAMES.FULFILLER_ORG_NAME);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmitEdit = () => {
    const updatedValues = { ...values, ...updateInfo };
    setLoading(true);
    updateSubmission({
      id: submission.id,
      values: updatedValues,
      include: 'values',
    })
      .then(result => {
        setReFetch(!reFetch);
        setEditMode(false);
        setLoading(false);
        // fetchSubmission({id: submission.id, include: 'values'})
        //   .then(result => {
        //     setValues(result.submission.values);
        //   }).catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className={`activity-container ${classes}`}>
      <div className="comment-header">
        <div>
          {values['Commenter']}: {date} {time.split('.')[0]}
          {showEdit && ' '}
          {showEdit && (
            <span className="edit-button" onClick={toggleEdit}>
              [{!editMode ? 'edit' : 'cancel'}]
            </span>
          )}
        </div>

        {!editMode ? (
          hours && <div>Hours Worked: {hours}</div>
        ) : (
          <div>
            Hours Worked:
            <input
              type="number"
              value={updateInfo[FORM_FIELDS.HOURS_WORKED]}
              onChange={e =>
                setUpdateInfo({
                  ...updateInfo,
                  [FORM_FIELDS.HOURS_WORKED]: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>
      <div className="comment-content">
        {!editMode ? (
          comment
        ) : (
          <textarea
            value={updateInfo[FORM_FIELDS.COMMENT]}
            onChange={e =>
              setUpdateInfo({
                ...updateInfo,
                [FORM_FIELDS.COMMENT]: e.target.value,
              })
            }
          />
        )}
      </div>
      {editMode && loading ? (
        <span>editing...</span>
      ) : (
        <TeamsButton onClick={handleSubmitEdit}>Submit Edit</TeamsButton>
      )}
    </div>
  );
};

export default Activity;
