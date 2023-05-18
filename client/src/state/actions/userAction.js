import { 
    createUserStart,
    createUserSuccess,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    clearUserState,
    loginUserStart,
    loginUserSuccess,
    loginUserFailure,
    logoutUserStart,
    logoutUserSuccess,
    logoutUserFailure,
    authStart,
    authFailure,
    authSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    createUserFailure
    } from '../reducers/userReducer';
    import {
      logoutStart,
      logoutSuccess,
      logoutFailure,
    } from '../reducers/authReducer';
    
import { api } from '../../services/api';


// Fetch users function
export const fetchUsers = () => async () =>{
  try {
    const users = await api.user.getCurrentUserProfile();
    console.log('Users:', users.firstName);
    // Process the users data as needed
  } catch (error) {
    console.error('Error:', error.message);
  }
}



// Get User Action
export const getUserAction = () => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const response = await api.user.getCurrentUserProfile();
    const { firstName, lastName, email, avatar } = response.data; // Access the nested 'data' property
    const user = { firstName, lastName, email, avatar };
    dispatch(getUserSuccess(user));
    console.log(user);
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};
// Login User Action
export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const response = await api.user.loginUser(email, password);
    console.log('Response:', response); // Logging the response
    console.log('User:', response.data.user); // Logging the user data
    dispatch(loginUserSuccess(response.data.user));
  } catch (error) {
    dispatch(loginUserFailure(error.message));
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
export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(loginUserStart());
    const { data } = await api.auth.register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
    });
    localStorage.setItem('token', data.token);
    dispatch(loginUserSuccess(data.user));
  } catch (err) {
    dispatch(loginUserFailure(err.message));
  }
};


// Logout User Action
export const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch(logoutStart());
    localStorage.removeItem('token'); // Remove the token from localStorage
    await api.auth.logout();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};
