import { createSlice } from '@reduxjs/toolkit';
import { IFood } from '@/models/Food';

interface foodState {
  foodData: IFood[] | [];
}
const initialState: foodState = {
  foodData: [],
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodData: (state, action) => {
      state.foodData = action.payload;
    },
  },
});

export const { setFoodData } = foodSlice.actions;
export default foodSlice.reducer;
