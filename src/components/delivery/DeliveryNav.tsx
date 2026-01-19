import Logo from '../ui/Logo';
import ProfileMenu from '../ProfileMenu';
import { auth } from '@/auth';
import GeoLocationUpdater from '../GeoLocationUpdater';
import Link from 'next/link';
import DeliveryMenu from './DeliveryMenu';

export default async function DeliveryNav() {
  const session = await auth();

  return (
    <div className="fixed top-0 right-0 left-0 z-10">
      <GeoLocationUpdater userId={session?.user.id} />
      <div className="flex h-15 items-center justify-between bg-white px-3 shadow-sm sm:px-8 lg:px-84">
        <Link href="/delivery">
          <Logo />
        </Link>

        <div className="flex items-center gap-10 md:gap-8">
          <DeliveryMenu />

          <ProfileMenu user={session?.user} />
        </div>
      </div>
    </div>
  );
}
