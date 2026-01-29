import DeliveryNav from '@/components/delivery/DeliveryNav';
import type { Metadata } from 'next';
import InitAssigments from '@/Init/InitAssignments';
import InitDeliveryBoySocket from '@/Init/InitDeliveryBoySocket';

export const metadata: Metadata = {
  title: 'FoodDrop | Delivery-Panel',
  description: 'FoodDrop - Order food online from best food delivery service',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <main>
        <DeliveryNav />
        <InitAssigments />
        <InitDeliveryBoySocket />
        {children}
      </main>
    </section>
  );
}
