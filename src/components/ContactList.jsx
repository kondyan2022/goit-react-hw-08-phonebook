import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContactThunk } from 'redux/contactSlice/thunk';
import { getContacts, getFilter } from 'redux/selectors';
import {
  Box,
  Card,
  IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from 'components/ConfirmDialog';

const ContactList = ({ onEdit }) => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const contactList = useMemo(
    () =>
      (filter
        ? contacts.filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
        : contacts
      ).toSorted((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      ),
    [contacts, filter]
  );

  return (
    <>
      <List>
        {contactList.map(({ id, name, number }) => (
          <ListItem key={id}>
            <Card
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography variant="h5" sx={{ mr: 'auto', ml: 1 }}>
                  {`${name}`}
                </Typography>
                <Link
                  href={`tel:${number.replaceAll(/[ \-.()]/g, '')}`}
                  underline={'none'}
                >
                  <Typography
                    variant="h5"
                    sx={{ mr: 1 }}
                  >{`${number}`}</Typography>
                </Link>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  alignItems: 'center',
                }}
              >
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    onEdit({ id: id, name: name, number: number });
                  }}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>

                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    setConfirmDeleteId(id);
                    // dispatch(deleteContactThunk(id));
                  }}
                >
                  <DeleteForeverIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Card>
          </ListItem>
        ))}
      </List>
      {confirmDeleteId && (
        <ConfirmDialog
          title="Delete contact?"
          id={confirmDeleteId}
          setOpen={setConfirmDeleteId}
          onConfirm={item => {
            dispatch(deleteContactThunk(item));
          }}
        >
          Are you sure?
        </ConfirmDialog>
      )}
    </>
  );
};

export default ContactList;
ContactList.propTypes = { onEdit: PropTypes.func.isRequired };
