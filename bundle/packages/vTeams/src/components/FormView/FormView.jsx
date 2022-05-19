import React from 'react';
import { CoreForm } from '@kineticdata/react';

const FormView = ({ formSlug, submissionId }) => {
  console.log(formSlug);
  if (submissionId) {
    return <CoreForm submission={submissionId} />;
  } else {
    return <CoreForm kapp="vteams" form={formSlug} />;
  }
};

export default FormView;
