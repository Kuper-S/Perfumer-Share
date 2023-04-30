import axios from 'axios';

const API_BASE_URL = '/api';

export const api = {
  user: {
    register: async (userData) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    login: async (credentials) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    getCurrentUserProfile: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    }
  },
  auth: {
    login: async (email, password) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    logout: async () => {
      try {
        await axios.post(`${API_BASE_URL}/auth/logout`);
      } catch (error) {
        console.error(error);
      }
    },
    register: async (formData) => {
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/register`, formData);
        return data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    }
  },
  post: {
    getPosts: (userId) =>
      axios.get(`${API_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    createPost: (postData) =>
      axios.post(`${API_BASE_URL}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    updatePost: (postData) =>
      axios.put(`${API_BASE_URL}/posts/${postData._id}`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    deletePost: (postId) =>
      axios.delete(`${API_BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    likePost: (postId) =>
      axios.put(`${API_BASE_URL}/posts/${postId}/like`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    unlikePost: (postId) =>
      axios.put(`${API_BASE_URL}/posts/${postId}/unlike`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    addComment: (postId, commentData) =>
      axios.post(`${API_BASE_URL}/posts/${postId}/comment`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    deleteComment: (postId, commentId) =>
      axios.delete(`${API_BASE_URL}/posts/${postId}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
  }
};
