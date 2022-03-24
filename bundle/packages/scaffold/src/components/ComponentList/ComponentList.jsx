import React, { useEffect, useState } from 'react';
import { fetchForm } from '@kineticdata/react';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import { FormGroup, Paper } from '@mui/material';

import { styles } from '../../assets/styles/styles';
import { pickComponent } from '../../lib/utils';

const ComponentList = ({ kappSlug, formSlug }) => {
  const [formJson, setFormJson] = useState('');
  const pages = formJson ? formJson.pages : [];
  let fields = [];

  // create flattened list of elements, and assign depth to sections
  const getFormElements = (parent, depth = 1) => {
    let elements = parent.elements;
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (element.type === 'section') {
        element.depth = depth;
        fields.push(element);
        getFormElements(element, depth + 1);

        // add a divider if it's not the list element of the form
        if (elements[i - 1]?.type !== 'divider' && elements[i + 1]) {
          fields.push({ type: 'divider', visible: true });
        }
      } else {
        fields.push(element);
      }
    }
  };

  for (let parent of pages) {
    getFormElements(parent);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted');
  };
  console.log(fields);

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
      <form onSubmit={handleSubmit}>
        <h1 style={styles.componentList.h1}>ComponentList</h1>

        <FormGroup>
          <Paper style={styles.form} elevation={8}>
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
      </form>
    </div>
  );
};

export default ComponentList;
