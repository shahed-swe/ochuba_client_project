import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { email: "", password: "", role: "" },
  Admintoken: '',
  FirstTime: true,
  userDetails: {},
  booking:{}
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.Admintoken = action.payload;
    },
    signout: (state) => {
      state.user = { email: "", password: "", role: "" };
      state.Admintoken = ''
    },
    setUserCompleteDetails: (state, action) => {
      state.userDetails = action.payload
    }
  },
});

export const { setUser, signout, setToken, setUserCompleteDetails } = userSlice.actions;
export const authReducer = userSlice.reducer;


