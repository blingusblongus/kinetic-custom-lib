import React from 'react';
import { CoreForm } from '@kineticdata/react';

const FormView = ({ formSlug, formId }) => {
  console.log(formSlug);
  if (formId) {
    return <CoreForm submission={formId} />;
  } else {
    return <CoreForm kapp="vteams" form={formSlug} />;
  }
};

export default FormView;
