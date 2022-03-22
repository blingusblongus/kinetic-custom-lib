import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

import { useSelector, useDispatch } from '../../../../redux/hooks/hooks';

const ListPicker = ({ style, choices = [], label, formKey }) => {
  const dispatch = useDispatch();
  const formResponses = useSelector(store => store.formResponses);

  //Filter already chosen choices out of dropdown
  const [value, setValue] = useState([]);
  choices.filter(el => !value.includes(el));

  const handleSelect = val => {
    dispatch({
      type: 'FORM_UPDATE',
      payload: {
        formKey: formKey,
        response: val,
      },
    });
    setValue([...val]);
  };

  return (
    <Box sx={style || { margin: '40px', width: '50%' }}>
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
            label={label || ''}
            placeholder={label || ''}
          />
        )}
      />
    </Box>
  );
};

export default ListPicker;
