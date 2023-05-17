import axios from 'axios';

const API_BASE_URL = 'http://localhost:3030/api';
// Function to get the token from local storage
const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to update the Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  user: {
    register: async (userData) => {
      try {
        const response = await axiosInstance.post('/users/register', userData);
        return response;
      } catch (error) {
        throw new Error(error.response.message);
      }
    },
    getCurrentUserProfile: async () => {
      try {
        const response = await axiosInstance.get('/users/profile');
        console.log(response.data);
        return response;
      } catch (error) {
        throw new Error(error.response.message);
      }
    },
    getUsers: async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/users`, { headers });
        console.log(response,headers);
        return response;
      } catch (error) {
        throw new Error(error.response.message);
      }
    },
  },
  auth: {
    login: async (email, password) => {
      try {
        const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, { email, password });
        const { token } = response.data;
  
        console.log('Token', token);
  
        if (!token) {
          console.log('No token found');
          return;
        }
  
        const responseData = { token }; // Create a new object with only the necessary data
  
        console.log('Response:', response);
        console.log('ResponseData:', responseData);
  
        return responseData;
      } catch (error) {
        throw new Error(error.response.message);
      }
    },
    logout: async () => {
      try {
        await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
     // Clear the JWT token from the client-side storage
     localStorage.removeItem('token');
     // Remove the "Authorization" header from future requests
     delete axiosInstance.defaults.headers.common['Authorization'];
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
        const { data } = await axiosInstance.post(`${API_BASE_URL}/auth/register`, formData);
        return data;
      } catch (error) {
        throw new Error(error.response.message);
      }
    }
  },
  post: {
    getPosts: (userId) =>
    axiosInstance.get(`${API_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    createPost: (postData) =>
    axiosInstance.post(`${API_BASE_URL}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    updatePost: (postData) =>
    axiosInstance.put(`${API_BASE_URL}/posts/${postData._id}`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    deletePost: (postId) =>
    axiosInstance.delete(`${API_BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    likePost: (postId) =>
    axiosInstance.put(`${API_BASE_URL}/posts/${postId}/like`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    unlikePost: (postId) =>
    axiosInstance.put(`${API_BASE_URL}/posts/${postId}/unlike`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    addComment: (postId, commentData) =>
    axiosInstance.post(`${API_BASE_URL}/posts/${postId}/comment`, commentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    deleteComment: (postId, commentId) =>
    axiosInstance.delete(`${API_BASE_URL}/posts/${postId}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
  }
};
