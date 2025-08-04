import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsData } from '../api/mockApi';

// 1. Create an "Async Thunk" for fetching data
// createAsyncThunk handles the logic of asynchronous actions for you.
// You provide a string for the action type prefix, and an async function
// that returns the data you need.
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async () => {
    const response = await fetchPostsData();
    return response;
  }
);

// 2. Define the initial state for this slice
const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// 3. Create the slice
// createSlice automatically generates action creators and the main reducer function.
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  // Reducers for synchronous actions go here (we don't have any yet)
  reducers: {},
  // Reducers for asynchronous actions (created by createAsyncThunk) go in `extraReducers`
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer to be used in our store
export default postsSlice.reducer;