import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderSlice } from './orderSlice';

interface AllOrderState {
  orders: IOrderSlice[];
  fetched: boolean;
}

const initialState: AllOrderState = {
  orders: [],
  fetched: false,
};

const allOrderSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    setAllOrders(state, action) {
      state.orders = action.payload;
      state.fetched = true;
    },

    prependOrder(state, action) {
      state.orders.unshift(action.payload);
    },

    updateOrderStatus(state, action) {
      const order = state.orders.find(
        (o) => o._id?.toString() === action.payload.orderId,
      );
      if (order) {
        order.status = action.payload.status;
      }
    },

    updateAssignedDeliveryBoy(state, action) {
      const { orderId, assignedDeliveryBoy } = action.payload;

      const order = state.orders.find((o) => o._id?.toString() === orderId);

      if (order) {
        order.assignedDeliveryBoy = assignedDeliveryBoy;
      }
    },

    clearAllOrders() {
      return initialState;
    },
  },
});

export const {
  setAllOrders,
  prependOrder,
  updateOrderStatus,
  clearAllOrders,
  updateAssignedDeliveryBoy,
} = allOrderSlice.actions;

export default allOrderSlice.reducer;
