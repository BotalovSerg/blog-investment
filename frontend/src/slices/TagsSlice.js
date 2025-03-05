import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await axios.get(`${API_URL}/tags/`);
  return response.data;
});

export const tagsSlice = createSlice({
  name: "tagsFetch",
  initialState: {
    tags: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectTags = (state) => state.tagsLoad.tags;
export default tagsSlice.reducer;
