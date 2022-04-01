import React from 'react';
import {
  ListPicker,
  CustomCheckbox,
  CustomDropdown,
  CustomText,
  CustomSectionHeader,
  CustomHTML,
  CustomRadio,
  CustomSubmit,
  CustomDate,
  CustomDivider,
  CustomTextInput,
} from '../components/CustomComponents/CustomComponents.jsx';

/**
 * Takes JSON form element and returns a custom JSX element
 * @param {Obj} element - Element or Section of form JSON
 * @returns {JSX} - Custom JSX form element
 */
export const pickComponent = element => {
  let key = element.key;

  //check for conditional validation
  if (element.required && typeof element.required !== 'boolean') {
    return <p>Conditional Validation not supported</p>;
  }

  // handle sections and dividers
  if (element.type === 'section') {
    return <CustomSectionHeader element={element} key={element.name} />;
  } else if (element.type === 'button') {
    if (element.renderType === 'submit-page') {
      return <CustomSubmit element={element} key={element.name} />;
    }
  } else if (element.type === 'divider') {
    return <CustomDivider />;
  }

  // handle 'field' elements
  switch (element.renderType) {
    case 'checkbox':
      if (element.renderAttributes.variant === 'multiselect') {
        return <ListPicker element={element} key={key} />;
      } else {
        return <CustomCheckbox element={element} key={key} />;
      }
    case 'dropdown':
      return <CustomDropdown element={element} key={key} />;
    case 'text':
      if (element.type === 'content') {
        return <CustomText element={element} key={key} />;
      } else {
        return <CustomTextInput element={element} key={key} />;
      }
    case 'html':
      return <CustomHTML element={element} key={key} />;
    case 'radio':
      return <CustomRadio element={element} key={key} />;
    case 'date':
      return <CustomDate element={element} key={key} />;
    default:
      return (
        <>
          <p key={key}>Component not supported</p>
          <pre>{JSON.stringify(element, null, 2)}</pre>
        </>
      );
  }
};
