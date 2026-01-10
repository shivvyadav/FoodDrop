import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setFoodData } from '@/redux/slices/foodSlice';

export default function useGetFoods() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('/api/get-foods');
        if (response.data.success) {
          dispatch(setFoodData(response.data.foods));
        }
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoods();
  }, [dispatch]);
}
