import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setOrderData } from '@/redux/slices/orderSlice';

export default function useGetUserOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { fetched } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (fetched) return;

    const fetchOrders = async () => {
      const res = await axios.get('/api/user/my-orders');
      dispatch(setOrderData(res.data.orders));
    };

    fetchOrders();
  }, [dispatch, fetched]);
}
