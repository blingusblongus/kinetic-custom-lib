import React, { useEffect, useState } from 'react';
import { fetchForm } from '@kineticdata/react';
import ListPicker from '../CustomComponents/ListPicker/ListPicker';
import CustomCheckbox from '../CustomComponents/CustomCheckbox/Checkbox';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import CustomDropdown from '../CustomComponents/CustomDropdown/CustomDropdown';
import CustomText from '../CustomComponents/CustomText/CustomText';

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
    let key = field.key;
    switch (field.renderType) {
      case 'checkbox':
        if (field.renderAttributes.variant == 'multiselect') {
          return <ListPicker element={field} key={key} />;
        } else {
          return <CustomCheckbox element={field} key={key} />;
        }
      case 'dropdown':
        return <CustomDropdown element={field} key={key} />;
      case 'text':
        return <CustomText element={field} key={key} />;
      default:
        return <p key={key}>Component not available</p>;
    }
  };

  // fetch supplied form, along with pages containing elements
  useEffect(() => {
    fetchForm({
      kappSlug: kappSlug,
      formSlug: formSlug,
      include: 'pages',
    }).then(({ form }) => setFormJson(form));
  }, []);

  return (
    <>
      <h1>ComponentList</h1>
      {fields.map(element => {
        if (!element.visible) return;
        return (
          <ComponentWrapper
            component={pickComponent(element)}
            sx={{ margin: 'auto', width: '80%' }}
            key={element.key}
          />
        );
      })}
      <pre>{JSON.stringify(formJson, null, 2)}</pre>
    </>
  );
};

export default ComponentList;
