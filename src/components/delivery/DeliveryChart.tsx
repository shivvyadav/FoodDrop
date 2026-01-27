'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

export default function DeliveryTodayChart({
  delivered,
  pending,
}: {
  delivered: number;
  pending: number;
}) {
  const data = [
    { name: 'Delivered', count: delivered },
    { name: 'Pending', count: pending },
  ];

  return (
    <div className="rounded-xl border border-neutral-400 bg-white p-4 shadow-2xs">
      <p className="mb-3 text-sm font-medium text-neutral-700">
        Today&apos;s Orders
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#fa5700" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
