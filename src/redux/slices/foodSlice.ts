import { createSlice } from '@reduxjs/toolkit';
import { IFood } from '@/models/Food';

interface foodState {
  foodData: IFood[];
  isLoaded: boolean;
}
const initialState: foodState = {
  foodData: [],
  isLoaded: false,
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodData: (state, action) => {
      state.foodData = action.payload;
      state.isLoaded = true;
    },
    prependFoodData: (state, action) => {
      state.foodData.unshift(action.payload);
    },

    updateFoodData: (state, action) => {
      state.foodData = state.foodData.map((food) => {
        if (food._id?.toString() === action.payload._id?.toString()) {
          return action.payload;
        }
        return food;
      });
    },
    deleteFoodData: (state, action) => {
      state.foodData = state.foodData.filter(
        (food) => food._id?.toString() !== action.payload?.toString(),
      );
    },
  },
});

export const { setFoodData, prependFoodData, updateFoodData, deleteFoodData } =
  foodSlice.actions;
export default foodSlice.reducer;
