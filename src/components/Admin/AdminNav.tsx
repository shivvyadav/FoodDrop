import { auth } from '@/auth';
import Logo from '../ui/Logo';
import AdminMenu from './AdminMenu';
import ProfileMenu from '../ProfileMenu';
export default async function AdminNav() {
  const session = await auth();

  return (
    <div className="fixed top-0 left-0 z-30 flex h-18 w-full items-center justify-between bg-white px-4 shadow lg:px-16">
      <Logo />
      <div className="flex items-center gap-4">
        <AdminMenu user={session?.user} />
        <div className="hidden lg:block">
          <ProfileMenu user={session?.user} />
        </div>
      </div>
    </div>
  );
}
