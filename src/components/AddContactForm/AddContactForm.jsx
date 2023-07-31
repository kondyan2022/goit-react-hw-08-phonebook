import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createPortal } from 'react-dom';

export default function AddContactForm({
  onSubmit,
  onCancel,
  modalIsOpen,
  formTitle,
  itemData,
}) {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, 'Min 2 letter!')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'only letters, apostrophe, dash and spaces'
      )
      .required('Required!'),
    number: yup
      .string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Invalid phone number.'
      )
      .required('Required!'),
  });
  const formik = useFormik({
    initialValues: {
      name: itemData?.name || '',
      number: itemData?.number || '',
    },
    validationSchema,
    onSubmit: values => {
      onSubmit({ id: itemData?.id, name: values.name, number: values.number });
    },
  });

  return createPortal(
    <div>
      <Dialog open={modalIsOpen} onClose={onCancel}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              id="name"
              name="name"
              type="text"
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={formik.values.name}
              // pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              onChange={formik.handleChange}
              required
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name ? true : false}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              id="number"
              margin="dense"
              label="Phone number"
              fullWidth
              variant="outlined"
              type="tel"
              name="number"
              value={formik.values.number}
              // pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              onChange={formik.handleChange}
              required
              onBlur={formik.handleBlur}
              error={
                formik.touched.number && formik.errors.number ? true : false
              }
              helperText={formik.touched.number && formik.errors.number}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.querySelector('#modal-root')
  );
}
