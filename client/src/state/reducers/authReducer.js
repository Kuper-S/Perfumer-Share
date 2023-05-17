import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || '', // Set initial value to an empty string
  loading: false,
  error: null,
  gender: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = { email };
      // Store the token in localStorage
      localStorage.setItem('token', token);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.token = ''; // Clear the token on logout
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateGender(state, action) {
      state.gender = action.payload;
    },
    setAuthenticatedUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});




export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateGender,
  setAuthenticatedUser,
} = authSlice.actions;

export default authSlice.reducer;


