import axios from 'axios';
import { getPostsStart,
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
      deleteCommentFailure, } from '../reducers/postReducer';
import { generateToken } from '../../utils/auth';

// Get Posts Action
export const getPostsAction = (userId) => async (dispatch) => {
    try {
      dispatch(getPostsStart());
      const token = generateToken(userId);
      const res = await axios.get('/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(getPostsSuccess(res.data));
    } catch (err) {
      dispatch(getPostsFailure(err.response.data));
    }
  };



// Create Post Action
export const createPostAction = (postData) => async (dispatch) => {
  try {
    dispatch(createPostStart());
    const token = generateToken(postData.userId);
    const res = await axios.post('/api/posts', postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(createPostSuccess(res.data));
  } catch (err) {
    dispatch(createPostFailure(err.response.data));
  }
};
// Update Post Action 
export const updatePostAction = (postData) => async (dispatch) => {
    try {
      dispatch(updatePostStart());
      const token = generateToken(postData.userId);
      const res = await axios.put(`/api/posts/${postData._id}`, postData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(updatePostSuccess(res.data));
    } catch (err) {
      dispatch(updatePostFailure(err.response.data));
    }
  };
  


// Delete Post Action
export const deletePostAction = (postId, userId) => async (dispatch) => {
  try {
    dispatch(deletePostStart());
    const token = generateToken(userId);
    const res = await axios.delete(`/api/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(deletePostSuccess(res.data));
  } catch (err) {
    dispatch(deletePostFailure(err.response.data));
  }
};

// Like Post Action
export const likePostAction = (postId, userId) => async (dispatch) => {
    try {
      dispatch(likePostStart());
      const token = generateToken(userId);
      const res = await axios.put(`/api/posts/${postId}/like`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(likePostSuccess(res.data));
    } catch (err) {
      dispatch(likePostFailure(err.response.data));
    }
  };
  
  // Unlike Post Action
  export const unlikePostAction = (postId, userId) => async (dispatch) => {
    try {
      dispatch(unlikePostStart());
      const token = generateToken(userId);
      const res = await axios.put(`/api/posts/${postId}/unlike`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(unlikePostSuccess(res.data));
    } catch (err) {
      dispatch(unlikePostFailure(err.response.data));
    }
  };
  
  // Add Comment Action
  export const addCommentAction = (postId, commentData, userId) => async (dispatch) => {
    try {
      dispatch(addCommentStart());
      const token = generateToken(userId);
      const res = await axios.post(`/api/posts/${postId}/comment`, commentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(addCommentSuccess(res.data));
    } catch (err) {
      dispatch(addCommentFailure(err.response.data));
    }
  };
  
  // Delete Comment Action
  export const deleteCommentAction = (postId, commentId, userId) => async (dispatch) => {
    try {
      dispatch(deleteCommentStart());
      const token = generateToken(userId);
      const res = await axios.delete(`/api/posts/${postId}/comment/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(deleteCommentSuccess(res.data));
    } catch (err) {
      dispatch(deleteCommentFailure(err.response.data));
    }
  };
  
