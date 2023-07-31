import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ title, children, id, setOpen, onConfirm }) => {
  return createPortal(
    <Dialog
      open={id ? true : false}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setOpen(null)}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            onConfirm(id);
            setOpen(null);
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>,
    document.querySelector('#modal-root')
  );
};

export default ConfirmDialog;
ConfirmDialog.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
