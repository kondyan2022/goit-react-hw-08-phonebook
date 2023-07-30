import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<AddCircleOutlineIcon />}
      onClick={onClick}
      sx={{ position: 'absolute', bottom: '10%', right: '20%' }}
    >
      Add contact
    </Button>
  );
};
