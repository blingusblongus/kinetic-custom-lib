import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

import { useDispatch } from '../../../redux/hooks/hooks';

const ListPicker = ({ element }) => {
  const dispatch = useDispatch();

  //Filter already chosen choices out of dropdown
  const [value, setValue] = useState([]);
  let choices = element.choices.filter(el => !value.includes(el));

  //dispatch an update to the store on selection
  const handleSelect = val => {
    dispatch({
      type: 'FORM_UPDATE',
      payload: {
        formKey: element.key,
        response: val,
      },
    });
    setValue([...val]);
  };

  return (
    <Box>
      <h2>{element.label}</h2>
      <Autocomplete
        multiple
        id="tags-standard"
        options={choices.map(choice => choice.label)}
        value={value}
        onChange={(e, val) => handleSelect(val)}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label={element.label || ''}
            placeholder={element.label || ''}
          />
        )}
      />
    </Box>
  );
};

export default ListPicker;
