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
import { api } from '../../services/api';
// Get Posts Action

export const getPostsAction = () => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const response = await api.post.getPosts();
    dispatch(getPostsSuccess(response.data));
  } catch (error) {
    dispatch(getPostsFailure(error.message));
  }
};

// Create Post Action
export const createPostAction = (postData) => async (dispatch) => {
  try {
    dispatch(createPostStart());
    
    const { title, body } = postData; // Destructure the title and body values from postData

    // Validate if title and body are not empty before making the API call
    if (!title || !body) {
      throw new Error('Title and body are required');
    }

    const response = await api.post.createPost(postData);
    dispatch(createPostSuccess(response.data));
  } catch (error) {
    dispatch(createPostFailure(error.message));
  }
};

// Update Post Action

export const updatePostAction = (postId, postData) => async (dispatch) => {
  try {
    dispatch(updatePostStart());
    const updatedData = {
      title: postData.title,
      body: postData.body,
      perfumeName: postData.perfumeName
    };
    const response = await api.post.updatePost(postId, updatedData);
    dispatch(updatePostSuccess(response.data));
  } catch (error) {
    dispatch(updatePostFailure(error.message));
  }
};
  


// Delete Post Action
export const deletePostAction = (postId) => async (dispatch) => {
  try {
    dispatch(deletePostStart());
    const response = await api.post.deletePost(postId);
    dispatch(deletePostSuccess(response.data));
  } catch (error) {
    dispatch(deletePostFailure(error.message));
  }
};

// Like Post Action
export const likePostAction = (postId) => async (dispatch) => {
  try {
    dispatch(likePostStart());
    const response = await api.post.likePost(postId);
    dispatch(likePostSuccess(response.data));
  } catch (error) {
    dispatch(likePostFailure(error.message));
  }
};

// Unlike Post Action
export const unlikePostAction = (postId) => async (dispatch) => {
  try {
    dispatch(unlikePostStart());
    const response = await api.post.unlikePost(postId);
    dispatch(unlikePostSuccess(response.data));
  } catch (error) {
    dispatch(unlikePostFailure(error.message));
  }
};

// Add Comment Action
export const addCommentAction = (postId, commentData) => async (dispatch) => {
  try {
    dispatch(addCommentStart());
    const response = await api.post.addComment(postId, commentData);
    dispatch(addCommentSuccess(response.data));
  } catch (error) {
    dispatch(addCommentFailure(error.message));
  }
};

// Delete Comment Action
export const deleteCommentAction = (postId, commentId) => async (dispatch) => {
  try {
    dispatch(deleteCommentStart());
    const response = await api.post.deleteComment(postId, commentId);
    dispatch(deleteCommentSuccess(response.data));
  } catch (error) {
    dispatch(deleteCommentFailure(error.message));
  }
};