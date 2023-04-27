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
import {generateToken, verifyToken} from '../../utils/auth';

// Get User Action
export const getUserAction = (userId) => async (dispatch) => {
    try {
      dispatch(getUserStart());
      const token = generateToken(userId);
      const res = await axios.get('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserFailure(err.response.data));
    }
  };
  
// Update User Action
export const updateUserAction = (userData) => async (dispatch) => {
    try {
      dispatch(updateUserStart());
      const token = generateToken(userData.id);
      const res = await axios.put(`/api/users/${userData.id}`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserFailure(err.response.data));
    }
  };


// Delete user Action

export const deleteUserAction = (userId) => async (dispatch) => {
    try {
      dispatch(deleteUserStart());
      const token = generateToken(userId);
      const res = await axios.delete(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(deleteUserSuccess(res.data));
    } catch (err) {
      dispatch(deleteUserFailure(err.response.data));
    }
};



// Create a new user Action

export const createUserAction = (userData) => async (dispatch) => {
    try {
      dispatch(createUserStart());
      const res = await axios.post('/api/users/register', userData);
      dispatch(createUserSuccess(res.data));
    } catch (err) {
      dispatch(createUserFailure(err.response.data));
    }
};


// Login User Action
export const loginUserAction = (credentials) => async (dispatch) => {
    try {
      dispatch(loginUserStart());
      const res = await axios.post('/api/auth/login', credentials);
      const token = generateToken(res.data.user.id);
      localStorage.setItem('token', token);
      dispatch(loginUserSuccess(res.data));
    } catch (err) {
      dispatch(loginUserFailure(err.response.data));
    }
  };
  
  // Logout User Action
  export const logoutUserAction = () => async (dispatch) => {
    try {
      dispatch(logoutUserStart());
      localStorage.removeItem('token');
      dispatch(logoutUserSuccess());
    } catch (err) {
      dispatch(logoutUserFailure(err));
    }
  };

