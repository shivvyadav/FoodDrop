import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setUserData } from '@/redux/slices/userSlice';

export default function useGetMe(enabled: boolean) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!enabled) return;

    const fetchMe = async () => {
      try {
        const response = await axios.get('/api/get-me');
        dispatch(setUserData(response.data.user));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchMe();
  }, [enabled, dispatch]);
}
