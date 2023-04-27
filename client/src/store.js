import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './state/reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;