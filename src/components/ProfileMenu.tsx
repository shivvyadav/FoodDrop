'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { signOut } from 'next-auth/react';
import {
  ListOrdered,
  LogOut,
  Settings,
  ShoppingBag,
  ShoppingCart,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function ProfileMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cartData } = useSelector((state: RootState) => state.cart);
  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative flex gap-2 md:gap-4">
      {user?.role === 'user' && (
        <button
          onClick={() => router.push('/cart')}
          className="relative flex size-8 items-center justify-center rounded-full bg-white"
        >
          <ShoppingBag className="size-5.5 text-neutral-800" />
          <span className="text-md absolute -top-1.5 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cartData?.length || 0}
          </span>
        </button>
      )}

      {/* user profile */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="border-border size-8 overflow-hidden rounded-full border-2 bg-white"
      >
        {userData?.image ? (
          <Image
            src={userData.image}
            alt="profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <span className="font-bold text-black">
            {user?.username[0].toUpperCase()}
          </span>
        )}
      </button>

      {/* menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border-border absolute top-14 -right-2.5 flex w-50 items-center justify-center rounded-xl border bg-white/40 py-2 text-black shadow-2xl backdrop-blur-2xl md:top-17"
          >
            <div className="flex w-full flex-col items-center gap-2 py-2">
              <div className="border-border relative flex size-18 items-center justify-center overflow-hidden rounded-full border bg-white">
                {userData?.image ? (
                  <Image
                    src={userData.image}
                    alt="profile"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-2xl font-bold text-black">
                    {user?.username[0].toUpperCase()}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-neutral-800">
                Hi, {user?.username.split(' ')[0]}
              </h2>
              <div className="flex w-full flex-col gap-1 text-sm font-medium text-neutral-800">
                <button
                  onClick={() => router.push('/edit-profile')}
                  className="flex items-center gap-2 px-4 py-1.5 hover:bg-zinc-100"
                >
                  <Settings size={16} />
                  Edit Profile
                </button>
                {user?.role === 'user' && (
                  <button
                    className="flex items-center gap-2 px-4 py-1.5 hover:bg-zinc-100"
                    onClick={() => router.push('/my-orders')}
                  >
                    <ListOrdered size={16} /> My Orders
                  </button>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center gap-2 px-4 py-1.5 hover:bg-zinc-100"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
