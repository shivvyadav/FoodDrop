import { createSlice } from '@reduxjs/toolkit';
import { IDeliveryAssignment } from '@/models/DeliveryAssignment';

interface DeliveryState {
  assignments: IDeliveryAssignment[];
  activeAssignment: any;
  initialized: boolean;
}

const initialState: DeliveryState = {
  assignments: [],
  activeAssignment: null,
  initialized: false,
};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setAssignments(state, action) {
      state.assignments = action.payload;
      state.initialized = true;
    },
    addAssignment(state, action) {
      const exists = state.assignments.some(
        (a) => a._id?.toString() === action.payload._id?.toString(),
      );

      if (!exists) {
        state.assignments.unshift(action.payload);
      }
    },

    setActiveAssignment(state, action) {
      state.activeAssignment = action.payload;
      state.initialized = true;
      if (action.payload?.assignment) {
        state.assignments = state.assignments.filter(
          (a) => a._id?.toString() !== action.payload.assignment.toString(),
        );
      }
    },

    clearActiveAssignment(state) {
      state.activeAssignment = null;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  setActiveAssignment,
  clearActiveAssignment,
} = deliverySlice.actions;

export default deliverySlice.reducer;
