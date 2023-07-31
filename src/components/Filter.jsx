import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

import { setFilter } from 'redux/filterSlice';
import { TextField } from '@mui/material';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleChange = evt => {
    if ((evt.target.name = 'filter')) {
      dispatch(setFilter(evt.target.value));
    }
  };
  return (
    <TextField
      label="Find contacts by name"
      id="standard-search"
      type="search"
      variant="standard"
      fullWidth
      sx={{ mt: 3, mb: 3 }}
      name="filter"
      value={filter}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Filter;
