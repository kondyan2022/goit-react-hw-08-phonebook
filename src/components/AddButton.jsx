import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export const AddButton = ({ onClick }) => {
  return createPortal(
    <Button
      variant="contained"
      size="large"
      startIcon={<AddCircleOutlineIcon />}
      onClick={onClick}
      sx={{ position: 'fixed', bottom: '10%', right: '40%' }}
    >
      Add contact
    </Button>,
    document.querySelector('#modal-root')
  );
};

AddButton.propType = {
  onClick: PropTypes.func.isRequired,
};
