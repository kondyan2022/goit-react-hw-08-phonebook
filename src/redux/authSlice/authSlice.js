import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  loginUserThunk,
  signupUserThunk,
  logoutUserThunk,
  refreshUserThunk,
} from './thunk';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
const arrThunk = [signupUserThunk, loginUserThunk, logoutUserThunk];
const getArrThunkStatus = status => arrThunk.map(elem => elem[status]);

const authHandlePending = state => {
  state.isPending = true;
};

const authHandleFulfilled = state => {
  state.isPending = false;
};
const authHandleFulfilledLoggedIn = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};

const authHandleFulfilledLoggedOut = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

const authHandleRejected = state => {
  state.isPending = false;
};
const authHandlePendingRefresh = state => {
  state.isRefreshing = true;
};
const authHandleRejectedRefresh = state => {
  state.isRefreshing = false;
};
const authHandleFulfilledRefresh = (state, { payload }) => {
  state.isRefreshing = false;
  state.isLoggedIn = true;
  state.user = payload;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      // .addCase(signupUserThunk.pending, authHandlePending)
      // .addCase(loginUserThunk.pending, authHandlePending)
      // .addCase(logoutUserThunk.pending, authHandlePending)
      // .addCase(loginUserThunk.fulfilled, authHandleFulfilled)
      // .addCase(signupUserThunk.fulfilled, authHandleFulfilled)
      // .addCase(logoutUserThunk.fulfilled, authHandleFulfilled)
      // .addCase(signupUserThunk.rejected, authHandleRejected)
      // .addCase(loginUserThunk.rejected, authHandleRejected)
      // .addCase(logoutUserThunk.rejected, authHandleRejected)
      .addCase(signupUserThunk.fulfilled, authHandleFulfilledLoggedIn)
      .addCase(loginUserThunk.fulfilled, authHandleFulfilledLoggedIn)
      .addCase(logoutUserThunk.fulfilled, authHandleFulfilledLoggedOut)
      .addCase(refreshUserThunk.pending, authHandlePendingRefresh)
      .addCase(refreshUserThunk.fulfilled, authHandleFulfilledRefresh)
      .addCase(refreshUserThunk.rejected, authHandleRejectedRefresh)
      .addMatcher(isAnyOf(...getArrThunkStatus(PENDING)), authHandlePending)
      .addMatcher(isAnyOf(...getArrThunkStatus(FULFILLED)), authHandleFulfilled)
      .addMatcher(isAnyOf(...getArrThunkStatus(REJECTED)), authHandleRejected);
  },
});
