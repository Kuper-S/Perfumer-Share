import axios from 'axios';

const API_BASE_URL = 'http://localhost:3030/api';

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
        console.log(response.data);
        return response.data;
        
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    logout: async () => {
      try {
        await axios.post(`${API_BASE_URL}/auth/logout`);
     // Clear the JWT token from the client-side storage
     localStorage.removeItem('token');
     // Remove the "Authorization" header from future requests
     delete axios.defaults.headers.common['Authorization'];
     // Delete the "myCookie" cookie
     document.cookie = "myCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     // Redirect the user to the login page
     window.location.href = '/login';
      } catch (err) {
        console.error(err);
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
