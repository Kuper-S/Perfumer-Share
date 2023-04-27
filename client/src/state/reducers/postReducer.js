// Import the action types
import { CREATE_POST, GET_POSTS, UPDATE_POST, DELETE_POST, LIKE_POST, UNLIKE_POST, ADD_COMMENT, DELETE_COMMENT } from '../actions/actionTypes';

// Define the initial state
const initialState = {
  posts: [],
  loading: true,
  error: null
}

// Define the reducer function
const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null
      }
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
        error: null
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        loading: false,
        error: null
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false,
        error: null
      }
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        loading: false,
        error: null
      }
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        loading: false,
        error: null
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        loading: false,
        error: null
      }
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        loading: false,
        error: null
      }
    default:
      return state;
  }
}

export default postReducer;
