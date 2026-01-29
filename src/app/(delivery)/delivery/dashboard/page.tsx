import { auth } from '@/auth';
import DeliveryChart from '@/components/delivery/DeliveryChart';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { redirect } from 'next/navigation';

export const revalidate = 300;

export default async function Dashboard() {
  await connectDB();
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const deliveryBoyId = session.user.id;
  const now = new Date();
  const startOfToday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const endOfToday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );

  const deliveredToday = await Order.countDocuments({
    assignedDeliveryBoy: deliveryBoyId,
    status: 'delivered',
    deliveredAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  });

  const pendingToday = await Order.countDocuments({
    assignedDeliveryBoy: deliveryBoyId,
    status: { $in: ['pending', 'out for delivery'] },
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  });

  const earningsToday = deliveredToday * 100;

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-20">
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-lg font-semibold">Today&apos;s Summary</h1>

        <div className="grid grid-cols-3 gap-3">
          <Stat title="Delivered" value={deliveredToday} />
          <Stat title="Pending" value={pendingToday} />
          <Stat title="Earnings" value={`Rs. ${earningsToday}`} />
        </div>
        <DeliveryChart delivered={deliveredToday} pending={pendingToday} />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-neutral-400 bg-white p-3 text-center shadow-2xs">
      <p className="text-xs text-neutral-500">{title}</p>
      <p className="text-lg font-semibold text-neutral-900">{value}</p>
    </div>
  );
}
