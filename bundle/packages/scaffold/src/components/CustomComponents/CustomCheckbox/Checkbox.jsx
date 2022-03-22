import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CustomCheckbox = ({ choices }) => {
  return (
    <FormGroup>
      {choices.map(choice => {
        return (
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={choice.label}
          />
        );
      })}
    </FormGroup>
  );
};

export default CustomCheckbox;
