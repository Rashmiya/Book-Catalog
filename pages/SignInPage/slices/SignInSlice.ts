/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  userDetail: [],
};

export const userSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    registerUserAction: (state, action) => {},
    loginUserAction: (state, action) => {},
    logOutUserAction: () => {},
    saveUserAction: (state, action) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetail = action.payload;
    },
    refreshFunction:()=>{},
  },
});

// Action creators are generated for each case reducer function
export const { 
  registerUserAction,
  loginUserAction,
  logOutUserAction,
  saveUserAction,
  setUserDetails,
  refreshFunction } = userSlice.actions;
export const selectUser = (state:any) => state.userReducer.userDetail;
export default userSlice.reducer;