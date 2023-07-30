import axios from 'axios';

axios.defaults.baseURL =
  'https://64b8491a21b9aa6eb079c089.mockapi.io/contacts/';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const fetchContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const addContact = async dataContact => {
  const { data } = await axios.post('/contacts', dataContact);
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};

export const editContact = async (id, dataContact) => {
  const { data } = await axios.patch(`/contacts/${id}`, dataContact);
  return data;
};

export const signupUser = async userData => {
  // try {
  const { data } = await axios.post('/users/signup', userData);

  setToken(data.token);
  return data;
  // } catch (e) {
  //   console.log(e.message);
  // }
};

export const loginUser = async userData => {
  const { data } = await axios.post('/users/login', userData);
  setToken(data.token);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post('/users/logout');
  clearToken();
  return data;
};

export const refreshUser = async token => {
  setToken(token);
  const { data } = await axios.get('/users/current');
  return data;
};
