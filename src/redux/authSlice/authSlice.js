import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  loginUserThunk,
  signupUserThunk,
  logoutUserThunk,
  refreshUserThunk,
} from './thunk';
import {
  authHandleFulfilled,
  authHandleFulfilledLoggedIn,
  authHandleFulfilledLoggedOut,
  authHandleFulfilledRefresh,
  authHandlePending,
  authHandlePendingRefresh,
  authHandleRejected,
  authHandleRejectedRefresh,
} from './handleAuth';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
const arrThunk = [signupUserThunk, loginUserThunk, logoutUserThunk];
const getArrThunkStatus = status => arrThunk.map(elem => elem[status]);

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(
        isAnyOf(signupUserThunk.fulfilled, loginUserThunk.fulfilled),
        authHandleFulfilledLoggedIn
      )
      .addCase(logoutUserThunk.fulfilled, authHandleFulfilledLoggedOut)
      .addCase(refreshUserThunk.pending, authHandlePendingRefresh)
      .addCase(refreshUserThunk.fulfilled, authHandleFulfilledRefresh)
      .addCase(refreshUserThunk.rejected, authHandleRejectedRefresh)
      .addMatcher(isAnyOf(...getArrThunkStatus(PENDING)), authHandlePending)
      .addMatcher(isAnyOf(...getArrThunkStatus(FULFILLED)), authHandleFulfilled)
      .addMatcher(isAnyOf(...getArrThunkStatus(REJECTED)), authHandleRejected);
  },
});
