import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostsStart(state) {
      state.loading = true;
    },
    getPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    getPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createPostStart(state) {
      state.loading = true;
    },
    createPostSuccess(state, action) {
      state.posts = [...state.posts, action.payload];
      state.loading = false;
      state.error = null;
    },
    createPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostStart(state) {
      state.loading = true;
    },
    updatePostSuccess(state, action) {
      state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
      state.loading = false;
      state.error = null;
    },
    updatePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostStart(state) {
      state.loading = true;
    },
    deletePostSuccess(state, action) {
      state.posts = state.posts.filter(post => post._id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deletePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    likePostStart(state) {
      state.loading = true;
    },
    likePostSuccess(state, action) {
      state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
      state.loading = false;
      state.error = null;
    },
    likePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    unlikePostStart(state) {
      state.loading = true;
    },
    unlikePostSuccess(state, action) {
      state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
      state.loading = false;
      state.error = null;
    },
    unlikePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentStart(state) {
      state.loading = true;
    },
    addCommentSuccess(state, action) {
      state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
      state.loading = false;
      state.error = null;
    },
    addCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCommentStart(state) {
      state.loading = true;
    },
    deleteCommentSuccess(state, action) {
      state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post);
      state.loading = false;
      state.error = null;
    },
    deleteCommentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
    deletePostStart,
    deletePostSuccess,
    deletePostFailure,
    likePostStart,
    likePostSuccess,
    likePostFailure,
    unlikePostStart,
    unlikePostSuccess,
    unlikePostFailure,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailure,
} = postSlice.actions;

export default postSlice.reducer;
 
