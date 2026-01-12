import Logo from '../ui/Logo';
import SearchComponent from './SearchComponent';
import ProfileMenu from '../ProfileMenu';

import { auth } from '@/auth';
import { IconBoltFilled } from '@tabler/icons-react';

export default async function UserNav() {
  const session = await auth();

  return (
    <div className="relative flex justify-center">
      <div className="fixed inset-0 top-0 z-40 mx-auto h-8 w-[92%] bg-white/0 backdrop-blur-lg md:w-[88%]" />
      <nav className="fixed top-3 z-50 mx-auto flex h-14 w-[92%] items-center justify-between rounded-xl bg-zinc-800 px-2.5 shadow-xl md:w-[88%] md:px-3 lg:h-17 lg:px-4">
        <div className="flex items-center gap-3 md:gap-8">
          <Logo />
          <SearchComponent />
        </div>
        <div className="flex items-center gap-4 text-white">
          <p className="hidden items-center space-x-1 text-sm lg:flex">
            <span>
              <IconBoltFilled className="size-5 text-orange-400" />
            </span>
            <span>Order now to get it within </span>
            <span className="font-medium text-orange-400"> 15 minutes!</span>
          </p>
          <ProfileMenu user={session?.user} />
        </div>
      </nav>
    </div>
  );
}
