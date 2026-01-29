import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './slices/userSlice';
import foodSlice from './slices/foodSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import allOrderSlice from './slices/allOrderSlice';
import deliverySlice from './slices/deliverySlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    user: userSlice,
    food: foodSlice,
    cart: persistedCartReducer,
    order: orderSlice,
    allOrder: allOrderSlice,
    delivery: deliverySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
