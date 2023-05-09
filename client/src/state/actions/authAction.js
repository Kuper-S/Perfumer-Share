import { api } from '../../services/api';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateGender
} from '../reducers/authReducer';

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.auth.login(userData);
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
    dispatch(logoutStart());
    await api.auth.logout();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await api.auth.register(formData);
    dispatch(loginSuccess(data));
    console.log(formData.email, formData.password, formData.gender);
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch(loginFailure(message));
  }
};

export const setGender = (gender) => async (dispatch) => {
  try {
    const { data } = await api.auth.updateGender(gender);
    dispatch(updateGender(data.gender));
  } catch (error) {
    console.error(error);
  }
};
