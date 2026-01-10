import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/models/User';

interface UserState {
  userData: IUser | null;
}
const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, updateUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
