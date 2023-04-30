import { getUserStart, getUserSuccess, getUserFailure ,
    updateUserStart, updateUserSuccess, updateUserFailure ,
    deleteUserSuccess,  deleteUserStart ,deleteUserFailure,
    createUserStart, createUserSuccess, createUserFailure,
    loginUserStart,
    loginUserSuccess,
    loginUserFailure,
    logoutUserStart,
    logoutUserSuccess,
    logoutUserFailure,
    } from '../reducers/userReducer';
import axios from 'axios';
import { api } from '../../services/api';
import {generateToken, verifyToken} from '../../utils/auth';

// Get User Action
export const getUserAction = () => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const response = await api.user.getCurrentUserProfile();
    dispatch(getUserSuccess(response));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};




// Update User Action
export const updateUserAction = (userData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    const res = await api.user.updateUser(userData);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure(err.response.data));
  }
};


// Delete user Action

export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await api.user.deleteUser(userId);
    dispatch(deleteUserSuccess());
  } catch (err) {
    dispatch(deleteUserFailure(err.message));
  }
};


// Create a new user Action

export const createUserAction = (userData) => async (dispatch) => {
  try {
    dispatch(createUserStart());
    const res = await api.user.register(userData);
    dispatch(createUserSuccess(res));
  } catch (err) {
    dispatch(createUserFailure(err.message));
  }
};


// Login User Action
export const loginUserAction = (credentials) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const res = await api.auth.login(credentials.email, credentials.password);
    localStorage.setItem('token', res.token);
    dispatch(loginUserSuccess(res.user));
  } catch (err) {
    dispatch(loginUserFailure(err.message));
  }
};

// Logout User Action
export const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch(logoutUserStart());
    localStorage.removeItem('token');
    dispatch(logoutUserSuccess());
  } catch (err) {
    dispatch(logoutUserFailure(err.message));
  }
};
