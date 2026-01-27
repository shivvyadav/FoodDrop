import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mongoose from 'mongoose';
import { IUser } from '@/models/User';

export interface IOrderSlice {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | IUser;
  items: {
    foodId: mongoose.Types.ObjectId;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: 'stripe' | 'cod';
  isPaid: boolean;
  address: {
    fullName: string;
    contact: number;
    fullAddress: string;
    city: string;
    state: string;
    pincode?: string;
    latitude: number;
    longitude: number;
  };
  assignment?: IUser | null;
  assignedDeliveryBoy?: mongoose.Types.ObjectId | null | IUser;
  status: 'pending' | 'out for delivery' | 'delivered';
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderSliceState {
  orderData: IOrderSlice[];
  fetched: boolean;
}

const initialState: OrderSliceState = {
  orderData: [],
  fetched: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData(state, action) {
      state.orderData = action.payload;
      state.fetched = true;
    },

    prependOrder: (state, action) => {
      const exists = state.orderData.some(
        (o) => o._id?.toString() === action.payload._id?.toString(),
      );

      if (!exists) {
        state.orderData.unshift(action.payload);
      }
    },
    updateOrderStatus(state, action) {
      const order = state.orderData.find(
        (o) => o._id?.toString() === action.payload.orderId,
      );

      if (order) {
        order.status = action.payload.status;
      }
    },

    updateAssignedDeliveryBoy(state, action) {
      const { orderId, assignedDeliveryBoy } = action.payload;

      const order = state.orderData.find((o) => o._id?.toString() === orderId);

      if (order) {
        order.assignedDeliveryBoy = assignedDeliveryBoy._id;
      }
    },
    updateOrder(state, action) {
      const { orderId, status, isPaid } = action.payload;

      const order = state.orderData.find((o) => o._id?.toString() === orderId);

      if (order) {
        order.status = status;
        order.isPaid = isPaid;
      }
    },
  },
});

export const {
  setOrderData,
  prependOrder,
  updateOrderStatus,
  updateOrder,
  updateAssignedDeliveryBoy,
} = orderSlice.actions;
export default orderSlice.reducer;
