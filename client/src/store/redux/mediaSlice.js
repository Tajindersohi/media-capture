import { createSlice } from "@reduxjs/toolkit";
import { getMediaList, addMedia } from "./mediaThunk";

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    gettingMedia: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    gettingMediaFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMedia: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    addNewMedia: (state, action) => {
      state.data.push(action.payload);
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMediaList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMediaList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getMediaList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addMedia.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { gettingMedia, gettingMediaFailed, getMedia, addNewMedia } =
  mediaSlice.actions;

export default mediaSlice.reducer;
