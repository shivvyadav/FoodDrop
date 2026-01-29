import UserNav from '@/components/user/UserNav';
import type { Metadata } from 'next';
import InitUserSocket from '@/Init/InitUserSocket';

export const metadata: Metadata = {
  title: 'FoodDrop | Admin-Panel',
  description: 'FoodDrop - Order food online from best food delivery service',
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <main>
        <InitUserSocket />
        {/* <UserNav /> */}
        {children}
      </main>
    </section>
  );
}
