import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mongoose from 'mongoose';

interface CartItem {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  image: string;
  price: number;
  category: string;
  type?: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ICartSlice {
  cartData: CartItem[];
}

const initialState: ICartSlice = {
  cartData: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartData.push(action.payload);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);
      if (!item) return;

      if (item.quantity === 1) {
        state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartData = state.cartData.filter((i) => i._id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
