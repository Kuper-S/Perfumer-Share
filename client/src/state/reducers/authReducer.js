import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
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
      const { user, token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = user;
    
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


