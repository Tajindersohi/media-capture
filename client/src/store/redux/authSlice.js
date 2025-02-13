import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  sent:false,
  message:""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginOrSignup(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser(state){
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginOrSignup, logoutUser } = authSlice.actions;
export default authSlice.reducer;
