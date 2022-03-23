import React, { useState } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useDispatch } from '../../../redux/hooks/hooks';

const CustomDropdown = ({ element }) => {
  const [selection, setSelection] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e, val) => {
    setSelection(e.target.value);
    dispatch({
      type: 'FORM_UPDATE',
      payload: {
        formKey: element.key,
        response: selection,
      },
    });
  };
  return (
    <>
      <h2>{element.label}</h2>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-standard-label">
          {element.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selection}
          onChange={handleChange}
          label="Age"
        >
          {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem> */}
          {element.choices.map((choice, i) => {
            return (
              <MenuItem value={choice.value} key={i}>
                {choice.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default CustomDropdown;
