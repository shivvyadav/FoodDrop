import AdminNav from '@/components/Admin/AdminNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FoodDrop | Admin-Panel',
  description: 'FoodDrop - Order food online from best food delivery service',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <AdminNav />
      <main>{children}</main>
    </section>
  );
}
