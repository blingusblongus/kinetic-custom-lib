import React from 'react';
import {
  ListPicker,
  CustomCheckbox,
  CustomDropdown,
  CustomText,
  CustomSectionHeader,
  CustomHTML,
  CustomRadio,
} from '../components/CustomComponents/CustomComponents.jsx';

/**
 * Takes JSON form element and returns a custom JSX element
 * @param {Obj} element - Element or Section of form JSON
 * @returns {JSX} - Custom JSX element
 */
export const pickComponent = element => {
  let key = element.key;

  if (element.type === 'section') {
    return <CustomSectionHeader element={element} key={element.name} />;
  }

  switch (element.renderType) {
    case 'checkbox':
      if (element.renderAttributes.variant == 'multiselect') {
        return <ListPicker element={element} key={key} />;
      } else {
        return <CustomCheckbox element={element} key={key} />;
      }
    case 'dropdown':
      return <CustomDropdown element={element} key={key} />;
    case 'text':
      return <CustomText element={element} key={key} />;
    case 'html':
      return <CustomHTML element={element} key={key} />;
    case 'radio':
      return <CustomRadio element={element} key={key} />;
    default:
      return (
        <>
          <p key={key}>Component not supported</p>
          <pre>{JSON.stringify(element, null, 2)}</pre>
        </>
      );
  }
};
