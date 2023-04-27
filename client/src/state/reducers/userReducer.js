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
} = userSlice.actions;

export default userSlice.reducer;
