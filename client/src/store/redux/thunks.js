import {createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from './adminAuthSlice';
import apiConstants from '../../api/Constants';
import { gettingUserInfo, gettingUserInfoFailed, loginOrSignup, logoutUser, sentLoginOtp } from './authSlice';
import { showError, showSuccess } from '../../Assets/Constants/showNotifier';
import { showLoading } from '../../Assets/Constants/showLoading';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.admin.login(credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(loginUser(user)); 
      return { token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/register',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiConstants.user.registerUser(credentials);
      if(response.status == 201){
        const { token, user} = response.data;
        showSuccess(response.data.message)
        localStorage.setItem('token', token);
        dispatch(loginOrSignup(user)); 
      }else{
        showError(response?.data?.message || 'Errow while Regsitration')
      }
      return response.data
    } catch (error) {
      showError(error.response?.data?.message || 'Registeration failed')
      return rejectWithValue(error.response?.data?.message || 'Registeration failed');
    }
  }
);

export const userLogin = createAsyncThunk(
  '/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingUserInfo());
      showLoading(true)
      const response = await apiConstants.user.login(credentials);
      if(response.status == 200){
        const { token, user} = response.data;
        showSuccess(response.data.message)
        localStorage.setItem('token', token);
        dispatch(loginOrSignup(user)); 
      }else{
        dispatch(gettingUserInfoFailed());
        showError(response?.data?.message || 'Errow while sending code')
      }
      showLoading(false)
      return response.data
    } catch (error) {
      showLoading(false)
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);

export const getMe = createAsyncThunk(
  'user/getMe',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(gettingUserInfo());
      const token = localStorage.getItem('token')
      if(token){
        showLoading(true)
        const response = await apiConstants.user.getMe({token:token});
        if(response.status == 200){
          const {user} = response.data;
          showSuccess(response.data.message)
          localStorage.setItem('token', token);
          dispatch(loginOrSignup(user)); 
        }else{
          dispatch(gettingUserInfoFailed());
          showError(response?.data?.message || 'Errow while sending code')
        }
        showLoading(false)
        return response.data
      }
    }catch(error){
      showLoading(false)
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);

export const changePwd = createAsyncThunk(
  '/change-password',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
        showLoading(true)
        const response = await apiConstants.user.changePassword({credentials});
        if(response.status == 200){
          showSuccess(response.data.message)
        }else{
          showError(response?.data?.message || 'Errow while sending code')
        }
        showLoading(false)
        return response.data
      } catch (error) {
      showLoading(false)
      return rejectWithValue(error.response?.data?.message || 'failed');
    }
  }
);


export const logout = createAsyncThunk('admin/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token'); 
  dispatch(logoutUser());
  showSuccess("Logout Successfully")
});


