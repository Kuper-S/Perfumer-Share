import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
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
  } = userSlice.actions;

export default userSlice.reducer;
