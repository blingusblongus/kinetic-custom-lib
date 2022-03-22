import React, { useEffect, useState } from 'react';
import { fetchForm } from '@kineticdata/react';

const ComponentList = ({ kappSlug, formSlug }) => {
  const [formJson, setFormJson] = useState('');
  const pages = formJson ? formJson.pages : [];
  let fields = [];

  //create array of all fields from all pages
  for (let page of pages) {
    let pageFields = page.elements.filter(el => el.type == 'field');

    fields = fields.concat(pageFields);
  }

  // fetch supplied form, along with pages containing elements
  useEffect(() => {
    fetchForm({
      kappSlug: kappSlug,
      formSlug: formSlug,
      // export: true,
      include: 'pages',
    }).then(({ form }) => setFormJson(form));
  }, []);

  console.log(fields);

  return (
    <>
      <h1>ComponentList</h1>
      <pre>{JSON.stringify(formJson, null, 2)}</pre>
    </>
  );
};

export default ComponentList;
