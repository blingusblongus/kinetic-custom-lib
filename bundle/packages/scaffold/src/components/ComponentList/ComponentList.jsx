import React, { useEffect, useState } from 'react';
import { fetchForm } from '@kineticdata/react';

const ComponentList = ({ kappSlug, formSlug }) => {
  const [formJson, setFormJson] = useState('');

  useEffect(() => {
    fetchForm({
      kappSlug: kappSlug,
      formSlug: formSlug,
      // export: true,
      include: 'pages',
    }).then(form => setFormJson(form));
  }, []);

  console.log(formJson);

  return (
    <>
      <h1>ComponentList</h1>
      <pre>{JSON.stringify(formJson, null, 2)}</pre>
    </>
  );
};

export default ComponentList;
