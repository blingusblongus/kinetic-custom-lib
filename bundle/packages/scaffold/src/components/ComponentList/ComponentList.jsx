import React, { useEffect, useState } from 'react';
import { fetchForm } from '@kineticdata/react';
import ListPicker from '../CustomComponents/ListPicker/ListPicker';

const ComponentList = ({ kappSlug, formSlug }) => {
  const [formJson, setFormJson] = useState('');
  const pages = formJson ? formJson.pages : [];
  let fields = [];

  //create array of all fields from all pages
  for (let page of pages) {
    let pageFields = page.elements.filter(el => el.type == 'field');

    fields = fields.concat(pageFields);
  }

  const pickComponent = field => {
    switch (field.renderType) {
      case 'checkbox':
        if (field.renderAttributes.variant == 'multiselect') {
          return (
            <ListPicker
              choices={field.choices}
              formKey={field.key}
              key={field.key}
            />
          );
        } else {
          return <p>Checkbox Placeholder</p>;
        }
      default:
        return <p key={field.key || -1}>Component not available</p>;
    }
  };

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
      {fields.map(pickComponent)}
      <pre>{JSON.stringify(formJson, null, 2)}</pre>
    </>
  );
};

export default ComponentList;
