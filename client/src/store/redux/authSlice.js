import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  sent:false,
  message:"",
  isFetching:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginOrSignup(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isFetching = false;
    },
    logoutUser(state){
      state.isAuthenticated = false;
      state.user = null;
    },
    gettingUserInfo(state){
      state.isAuthenticated = false;
      state.user = null;
      state.isFetching = true;
    },
    gettingUserInfoFailed(state){
      state.isAuthenticated = false;
      state.user = null;
      state.isFetching = false;
    },
  },
});

export const { loginOrSignup, logoutUser, gettingUserInfo,gettingUserInfoFailed } = authSlice.actions;
export default authSlice.reducer;
