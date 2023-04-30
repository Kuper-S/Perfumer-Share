import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');
export const logout = createAction('auth/logout');

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post('/api/auth/login', { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(loginFailure(message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post('/api/auth/logout');
    dispatch(logout());
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post('/api/auth/register', formData);
    dispatch(loginSuccess(data));
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(loginFailure(message));
  }
};