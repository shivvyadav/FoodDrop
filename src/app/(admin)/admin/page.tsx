import { auth } from '@/auth';
import Dashboard from '@/components/Admin/Dashboard';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { redirect } from 'next/navigation';
async function page() {
  await connectDB();
  const session = await auth();

  if (session?.user?.role !== 'admin') {
    redirect('/login');
  }

  const totalUsers = await User.find({
    role: 'user',
  }).countDocuments();
  return (
    <>
      <Dashboard totalUsers={totalUsers} />
    </>
  );
}

export default page;
