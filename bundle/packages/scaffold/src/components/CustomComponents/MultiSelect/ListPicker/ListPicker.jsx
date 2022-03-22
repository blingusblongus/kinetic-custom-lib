import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

const ListPicker = ({
  style,
  options = [],
  label,
  selected = [],
  setSelected,
}) => {
  // const [selected, setSelected] = useState(selected)

  options.filter(el => !selected.includes(el));
  const [value, setValue] = useState([]);

  const handleSelect = val => {
    if (val === null) return;
    if (selected.includes(val)) {
      setSelected(selected.filter(el => el !== val));
    } else {
      setSelected([...selected, val]);
    }
    setValue(val);
  };

  return (
    <Box sx={style || { margin: '40px', width: '50%' }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={options}
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
