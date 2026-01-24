import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import foodSlice from './slices/foodSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import allOrderSlice from './slices/allOrderSlice';
import deliverySlice from './slices/deliverySlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    food: foodSlice,
    cart: cartSlice,
    order: orderSlice,
    allOrder: allOrderSlice,
    delivery: deliverySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
