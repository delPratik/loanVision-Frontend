import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRedux = createAsyncThunk('fetchTodos', async () => {
  const response = await fetch("");
  return response.json();
});

const Redux = createSlice({
  name: "Redux",
  initialState: { // Fixed the typo from 'inintialState' to 'initialState'
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRedux.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRedux.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRedux.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default Redux.reducer;
