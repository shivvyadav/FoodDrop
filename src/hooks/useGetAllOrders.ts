'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setAllOrders } from '@/redux/slices/allOrderSlice';

export default function useGetAllOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { fetched } = useSelector((state: RootState) => state.allOrder);

  useEffect(() => {
    if (fetched) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/admin/get-orders');
        console.log(res.data);
        dispatch(setAllOrders(res.data.orders));
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, [fetched, dispatch]);
}
