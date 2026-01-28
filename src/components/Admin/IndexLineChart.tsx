'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

type ChartData = {
  date: string;
  orders: number;
  revenue: number;
};

export default function IndexLineChart({ orders }: any) {
  const dataMap: Record<string, ChartData> = {};

  orders.forEach((order: any) => {
    const date = dayjs(order.createdAt).format('DD MMM');

    if (!dataMap[date]) {
      dataMap[date] = {
        date,
        orders: 0,
        revenue: 0,
      };
    }

    dataMap[date].orders += 1;

    if (order.status === 'delivered') {
      dataMap[date].revenue += order.totalAmount;
    }
  });

  const data = Object.values(dataMap);

  if (!data.length) {
    return (
      <div className="mt-8 flex h-72 items-center justify-center text-sm text-neutral-500">
        No analytics data yet
      </div>
    );
  }

  return (
    <div className="border-border mt-8 h-80 w-full rounded-2xl border bg-neutral-50 p-4 md:h-96">
      <p className="mb-4 text-sm font-semibold text-neutral-800">
        Orders & Revenue Trend
      </p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="6 6" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#374151"
            tick={{ fill: '#374151', fontSize: 12 }}
          />
          <YAxis stroke="#374151" tick={{ fill: '#374151', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              background: '#fafafa',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              color: '#111827',
            }}
            labelStyle={{ color: '#111827' }}
          />

          <Line
            type="monotone"
            dataKey="orders"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
