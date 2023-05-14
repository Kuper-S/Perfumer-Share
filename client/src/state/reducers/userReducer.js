import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  loading: false,
  error: null,
  gender: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
    },
    setGender(state, action) {
        state.gender = action.payload;
    },
    getUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    createUserSuccess(state, action) {
      const { user, token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = user;
      state.error = null;
    },
    getUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
    },
    updateUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createUserStart(state, action) {
      
    },
     deleteUserStart(){},
     deleteUserSuccess(){},
     deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
     createUserFailure(){},

    clearUserState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
        loginUserStart(state) {
        state.loading = true;
      },
      loginUserSuccess(state, action) {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      },
      loginUserFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      logoutUserStart(state) {
        state.loading = true;
      },
      logoutUserSuccess(state) {
        state.user = null;
        state.loading = false;
        state.error = null;
      },
      logoutUserFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
      authStart(state) {
        state.loading = true;
        state.error = null;
      },
      authSuccess(state) {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      },
      authFailure(state, action) {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      },

  },
});

export const {
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
    deleteUserSuccess,
    deleteUserFailure,
    createUserStart,
    createUserFailure,
    createUserSuccess,
    deleteUserStart
  } = userSlice.actions;

export default userSlice.reducer;

