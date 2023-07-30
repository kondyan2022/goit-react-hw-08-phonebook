import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  deleteContactThunk,
  fetchContactsThunk,
  addContactThunk,
  editContactThunk,
} from './thunk';
import { initialState } from './initialState';
import {
  handleFulfilled,
  handleFulfilledDelete,
  handleFulfilledEdit,
  handleFulfilledGet,
  handleFulfilledPost,
  handlePending,
  handleRejected,
} from './handleContacts';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const arrThunk = [
  deleteContactThunk,
  fetchContactsThunk,
  addContactThunk,
  editContactThunk,
];

const getArrThunkStatus = status => arrThunk.map(elem => elem[status]);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    resetState(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFulfilledGet)
      .addCase(addContactThunk.fulfilled, handleFulfilledPost)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDelete)
      .addCase(editContactThunk.fulfilled, handleFulfilledEdit)
      .addMatcher(isAnyOf(...getArrThunkStatus(PENDING)), handlePending)
      .addMatcher(isAnyOf(...getArrThunkStatus(FULFILLED)), handleFulfilled)
      .addMatcher(isAnyOf(...getArrThunkStatus(REJECTED)), handleRejected);
  },
});

export const { resetState } = contactsSlice.actions;
