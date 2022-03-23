import React, { useEffect, useState } from 'react';
import { fetchForm } from '@kineticdata/react';
import ListPicker from '../CustomComponents/ListPicker/ListPicker';
import CustomCheckbox from '../CustomComponents/CustomCheckbox/Checkbox';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import CustomDropdown from '../CustomComponents/CustomDropdown/CustomDropdown';
import CustomText from '../CustomComponents/CustomText/CustomText';
import CustomSectionHeader from '../CustomComponents/CustomSectionHeader/CustomSectionHeader';
import { FormGroup, Paper } from '@mui/material';

import { styles } from '../../assets/styles/styles';

const ComponentList = ({ kappSlug, formSlug }) => {
  const [formJson, setFormJson] = useState('');
  const pages = formJson ? formJson.pages : [];
  let fields = [];

  //   //create array of all fields from all pages
  //   for (let page of pages) {
  //     let pageFields = page.elements.filter(el => el.type == 'field');

  //     fields = fields.concat(pageFields);
  //   }

  // create flattened list of elements, and assign depth to sections
  const getElements = (parent, depth = 1) => {
    for (let element of parent.elements) {
      if (element.type == 'section') {
        element.depth = depth;
        fields.push(element);
        getElements(element, depth + 1);
      } else {
        fields.push(element);
      }
    }
  };
  for (let parent of pages) {
    getElements(parent);
  }

  console.log(fields);

  // Determine custom component to render
  const pickComponent = field => {
    let key = field.key;

    if (field.type === 'section') {
      return <CustomSectionHeader element={field} key={field.name} />;
    }

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
        return (
          <>
            <p key={key}>Component not available</p>
            <pre>{JSON.stringify(field, null, 2)}</pre>
          </>
        );
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
    <div style={styles.background}>
      <h1 style={styles.componentList.h1}>ComponentList</h1>
      <FormGroup>
        <Paper
          sx={{
            m: '1rem auto',
            width: '80%',
            padding: '2rem',
            bgcolor: styles.form.backgroundColor,
          }}
          elevation={8}
        >
          {// iterate through form fields, wrapping custom components
          fields.map(element => {
            if (!element.visible) return;
            return (
              <ComponentWrapper
                component={pickComponent(element)}
                sx={{ margin: 'auto', width: '80%' }}
                key={element.key || Math.random()}
              />
            );
          })}
        </Paper>
      </FormGroup>
      <pre>{JSON.stringify(formJson, null, 2)}</pre>
    </div>
  );
};

export default ComponentList;
