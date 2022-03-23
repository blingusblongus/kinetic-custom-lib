import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from '../../../redux/hooks/hooks';

const CustomCheckbox = ({ element }) => {
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
      <h6>{element.label}</h6>

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

export default CustomCheckbox;
