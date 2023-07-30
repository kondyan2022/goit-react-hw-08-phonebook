import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'redux/contactSlice/thunk';
import { getContacts, getFilter } from 'redux/selectors';
import {
  Card,
  IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const ContactList = ({ onEdit }) => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

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
    <List>
      {contactList.map(({ id, name, number }) => (
        <ListItem key={id}>
          <Card sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography variant="h5" sx={{ mr: 'auto', ml: 1 }}>
              {`${name}`}
            </Typography>
            <Link
              href={`tel:${number.replaceAll(/[ \-.()]/g, '')}`}
              underline={'none'}
            >
              <Typography variant="h5" sx={{ mr: 1 }}>{`${number}`}</Typography>
            </Link>
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
                dispatch(deleteContactThunk(id));
              }}
            >
              <DeleteForeverIcon fontSize="inherit" />
            </IconButton>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
