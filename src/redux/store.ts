import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import foodSlice from './slices/foodSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    food: foodSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
