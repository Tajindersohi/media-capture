import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMedia,
  gettingMedia,
  gettingMediaFailed,
  addNewMedia,
} from "./mediaSlice";
import apiConstants from "../../api/Constants";
import { showError, showSuccess } from "../../Assets/Constants/showNotifier";

export const getMediaList = createAsyncThunk(
  "media/getMediaList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingMedia()); // Start loading state
      const response = await apiConstants.media.getList();
      console.log("response",response); 
      if (response.data.success) {
        const list = response.data.data || []; // Ensure correct data path
        dispatch(getMedia(list)); 
        return list;
      } else {
        throw new Error(response.data.message || "Failed to fetch media list");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error fetching media";
      dispatch(gettingMediaFailed(errorMsg));
      showError(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Add New Media
export const addMedia = createAsyncThunk(
  "media/addMedia",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.media.addMedia(data);
      
      if (response.data.success) {
        dispatch(addNewMedia(response.data.media)); // Add media to state
        showSuccess("Upload Successfully");
        return response.data.media;
      } else {
        throw new Error(response.data.message || "Failed to add media");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error adding media";
      showError(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);
