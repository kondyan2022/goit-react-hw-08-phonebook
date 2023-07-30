import { Container } from '@mui/material';
import { AddButton } from 'components/AddButton';
import AddContactForm from 'components/AddContactForm/AddContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/authSlice';
import {
  addContactThunk,
  editContactThunk,
  fetchContactsThunk,
} from 'redux/contactSlice/thunk';
import { getContacts } from 'redux/selectors';

export const ContactListPage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContactsThunk());
    }
  }, [dispatch, isLoggedIn]);

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const handleEditClick = values => {
    setModalIsOpen(true);
    setItemEdit(values);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setItemEdit(null);
  };

  const handleSubmit = ({ id, name, number }) => {
    console.log({ id, name, number });

    if (
      (id ? contacts.filter(({ id: cid }) => id !== cid) : contacts).some(
        ({ name: cname }) => cname === name
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    if (!id) {
      dispatch(addContactThunk({ name: name, number: number }));
    } else {
      if (
        !contacts.some(
          ({ id: cid, name: cname, number: cnumber }) =>
            id === cid && name === cname && number === cnumber
        )
      ) {
        dispatch(editContactThunk({ id: id, name: name, number: number }));
      }
    }
    setModalIsOpen(false);
    setItemEdit(null);
  };

  return (
    <Container>
      {modalIsOpen && (
        <AddContactForm
          modalIsOpen
          formTitle={itemEdit ? 'Edit contact' : 'Add contact'}
          onCancel={handleCloseModal}
          onSubmit={handleSubmit}
          itemData={itemEdit}
        />
      )}
      <Filter />
      <ContactList onEdit={handleEditClick} />
      <AddButton onClick={handleAddClick} />
    </Container>
  );
};
