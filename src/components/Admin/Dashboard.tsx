'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion } from 'motion/react';
import { Loader, ShoppingBag, Truck, Users, Coins } from 'lucide-react';
import StatCard from './StatCard';
import IndexLineChart from './IndexLineChart';
import OrderList from './OrderList';

export default function Dashboard({ totalUsers }: { totalUsers: number }) {
  const { orders, fetched } = useSelector((state: RootState) => state.allOrder);

  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const activeDeliveries = orders.filter(
    (o) => o.status === 'out for delivery',
  ).length;

  if (!fetched) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mb-8 max-w-4xl px-6 pt-26 md:px-8"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          gradient="bg-gradient-to-r from-rose-500 to-rose-600"
        />
        <StatCard
          title="Revenue"
          value={`Rs ${totalRevenue.toFixed(2)}`}
          icon={Coins}
          gradient="bg-gradient-to-r from-orange-400 to-orange-500"
        />
        <StatCard
          title="Active Deliveries"
          value={activeDeliveries}
          icon={Truck}
          gradient="bg-gradient-to-r from-red-500 to-red-600"
        />
        <StatCard
          title="Customers"
          value={totalUsers}
          icon={Users}
          gradient="bg-gradient-to-r from-green-400 to-green-500"
        />
      </div>
      <IndexLineChart orders={orders} />
      <OrderList orders={orders} />
    </motion.div>
  );
}
