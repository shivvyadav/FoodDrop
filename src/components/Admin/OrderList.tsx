'use client';

import dayjs from 'dayjs';

type Order = {
  _id: string;
  user?: { name?: string };
  createdAt: string;
  status: string;
};

export default function OrderList({ orders }: { orders: any }) {
  if (!orders.length) {
    return (
      <div className="mt-8 rounded-2xl border bg-neutral-50 p-6 text-sm text-neutral-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="border-border mt-8 overflow-hidden rounded-2xl border bg-neutral-50">
      <div className="border-b px-6 py-4 text-sm font-semibold text-neutral-800">
        Recent Orders
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-neutral-100 text-neutral-600">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Customer</th>
              <th className="px-6 py-3 text-left font-medium">Order ID</th>
              <th className="px-6 py-3 text-left font-medium">Order Time</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => (
              <tr
                key={order._id}
                className="border-t border-dashed border-neutral-400 hover:bg-neutral-100/60"
              >
                <td className="px-6 py-4 text-neutral-800">
                  {order?.address?.fullName ?? 'Unknown'}
                </td>
                <td className="px-6 py-4 font-mono text-neutral-700">
                  #{order._id.slice(0, 6)}
                </td>
                <td className="px-6 py-4 text-neutral-600">
                  {dayjs(order.createdAt).format('DD MMM, hh:mm A')}
                </td>
                <td className="px-6 py-4 font-medium text-neutral-600">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
