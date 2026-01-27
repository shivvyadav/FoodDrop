'use client';

import { Menu, X, SquarePen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const MENU = [
  { label: 'Dashboard', link: '/admin' },
  { label: 'Add Food', link: '/admin/add-foods' },
  { label: 'View Foods', link: '/admin/view-foods' },
  { label: 'Manage Orders', link: '/admin/manage-orders' },
];

export default function AdminMenu({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const baseBtn =
    'rounded-lg border border-border px-4 py-2 text-left transition-colors text-sm';
  const activeBtn = 'bg-primary text-white';
  const inactiveBtn = 'bg-neutral-50 hover:bg-neutral-100';

  const renderButtons = (isMobile = false) =>
    MENU.map((item) => {
      const isActive = pathname === item.link;

      return (
        <button
          key={item.label}
          onClick={() => {
            if (isMobile) setOpen(false);
            router.push(item.link);
          }}
          className={`${baseBtn} ${
            isActive ? activeBtn : inactiveBtn
          } ${isMobile ? 'py-2' : ''}`}
        >
          {item.label}
        </button>
      );
    });

  return (
    <div className="text-black">
      <button
        onClick={() => setOpen(true)}
        className="border-border rounded-md border-2 p-0.5 lg:hidden"
      >
        <Menu className="text-neutral-700" />
      </button>

      <div className="hidden gap-2 lg:flex">{renderButtons()}</div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-white p-4 lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="font-heading m-1 font-semibold text-neutral-800">
                  Admin Panel
                </p>
                <X
                  onClick={() => setOpen(false)}
                  className="size-6 text-neutral-800"
                />
              </div>

              <div className="relative mb-4 flex items-start gap-2 rounded-lg border border-neutral-200 px-2 py-2">
                <div className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-xl font-medium">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="profile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <span>{user?.username?.[0]?.toUpperCase()}</span>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-neutral-800">
                    {user?.username}
                  </p>
                  <span className="text-xs text-neutral-500">admin</span>
                </div>
                <SquarePen
                  onClick={() => router.push('/edit-profile')}
                  className="absolute top-1 right-1 size-4.5 text-neutral-700"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3">
                {renderButtons(true)}
              </div>

              <button
                onClick={() => signOut()}
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600"
              >
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
