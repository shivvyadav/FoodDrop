'use client';
import { usePathname } from 'next/navigation';
import useGetMe from '@/hooks/useGetMe';

export default function InitAllUser() {
  const pathname = usePathname();

  const shouldFetchUser =
    pathname !== '/' && pathname !== '/login' && pathname !== '/register';

  useGetMe(shouldFetchUser);

  return null;
}
