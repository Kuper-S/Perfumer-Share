import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  user: userReducer,
  post : postReducer,
  auth: authReducer,
});

export default rootReducer;
