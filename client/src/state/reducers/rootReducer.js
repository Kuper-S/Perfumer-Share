import { combineReducers } from 'redux';
import userReducer from './userReducer';
import genderReducer from './genderReducer';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  gender: genderReducer,
  post : postReducer,
});

export default rootReducer;
