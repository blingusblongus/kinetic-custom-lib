import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';

import { useDispatch } from '../../redux/hooks/hooks';

export const CustomCheckbox = ({ element }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const toggleSelected = e => {
    let value = e.currentTarget.value;

    if (selected.includes(value)) {
      setSelected(selected.filter(el => el !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(
    () => {
      dispatch({
        type: 'FORM_UPDATE',
        payload: {
          name: element.name,
          response: selected,
        },
      });
    },
    [selected],
  );

  return (
    <>
      <Typography variant="h6">{element.label}</Typography>

      <FormGroup>
        {element.choices.map((choice, i) => {
          let checked = selected.includes(choice.value);
          return (
            <FormControlLabel
              control={<Checkbox value={choice.value} checked={checked} />}
              label={choice.label}
              key={i}
              onChange={toggleSelected}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export const CustomDropdown = ({ element }) => {
  const [selection, setSelection] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e, val) => {
    setSelection(e.target.value);
  };

  useEffect(
    () => {
      dispatch({
        type: 'FORM_UPDATE',
        payload: {
          name: element.name,
          response: selection,
        },
      });
    },
    [selection],
  );
  return (
    <>
      <Typography variant="h6">{element.label}</Typography>
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

export const CustomSectionHeader = ({ element }) => {
  let level = element.depth > 6 ? 6 : element.depth;
  let Tag = `h${level}`;
  return <Tag>{element.title}</Tag>;
};

export const CustomText = ({ element }) => {
  return <Typography variant="p">{element.text}</Typography>;
};

export const ListPicker = ({ element }) => {
  const dispatch = useDispatch();

  //Filter already chosen choices out of dropdown
  const [value, setValue] = useState([]);
  let choices = element.choices.filter(el => !value.includes(el));

  //dispatch an update to the store on selection
  const handleSelect = val => {
    dispatch({
      type: 'FORM_UPDATE',
      payload: {
        name: element.name,
        response: val,
      },
    });
    setValue([...val]);
  };

  return (
    <Box>
      <Typography variant="h6">{element.label}</Typography>
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
            // label={element.label || ''}
            placeholder={element.label || ''}
          />
        )}
      />
    </Box>
  );
};

export const CustomHTML = ({ element }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: element.text }} />
    </>
  );
};

export const CustomRadio = ({ element }) => {
  const dispatch = useDispatch();
  const handleChange = (e, val) => {
    dispatch({
      type: 'FORM_UPDATE',
      payload: {
        name: element.name,
        response: val,
      },
    });
  };
  return (
    <FormControl>
      <Typography variant="h6">{element.label}</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={element.defaultValue}
        name={element.name}
        onChange={handleChange}
      >
        {element.choices.map(choice => {
          return (
            <FormControlLabel
              value={choice.value}
              control={<Radio />}
              label={choice.label}
              key={choice.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export const CustomSubmit = ({ element }) => {
  return (
    <Button
      type="submit"
      variant={element.renderAttributes?.variant}
      onClick={() => console.log('clicked')}
    >
      {element.label}
    </Button>
  );
};

export const CustomDate = ({ element }) => {
  let today = new Date();
  const dispatch = useDispatch();
  const handleChange = e => {
    dispatch({
      type: 'FORM_UPDATE',
      payload: {
        name: element.name,
        response: e.target.value,
      },
    });
  };
  return (
    <>
      <Typography variant="h6">{element.label}</Typography>
      <TextField
        type="date"
        defaultValue={today.toISOString().split('T')[0]}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </>
  );
};
