import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser, signupUser } from 'utils/mockapi';

export const signupUserThunk = createAsyncThunk(
  'auth/signup',
  async (userData, thunkAPI) => {
    try {
      return await signupUser(userData);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      return await loginUser(userData);
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      return await logoutUser();
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      return await refreshUser(persistedToken);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
