import React from 'react';
import { CoreForm } from '@kineticdata/react';

const FormView = ({ formSlug }) => {
  console.log(formSlug);
  return <CoreForm kapp="vteams" form={formSlug} />;
};

export default FormView;
