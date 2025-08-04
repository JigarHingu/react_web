import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

// configureStore simplifies the store setup process.
// It automatically includes helpful middleware like Redux Thunk for async logic
// and enables the Redux DevTools Extension.
export const store = configureStore({
  // The `reducer` field is an object where each key is a slice of state,
  // and the value is the reducer function for that slice.
  reducer: {
    posts: postsReducer,
  },
});