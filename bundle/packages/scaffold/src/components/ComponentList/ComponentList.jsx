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
    for (let element of parent.elements) {
      if (element.type === 'section') {
        element.depth = depth;
        fields.push(element);
        getFormElements(element, depth + 1);
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
