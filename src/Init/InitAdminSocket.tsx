'use client';

import useAdminSocket from '@/hooks/socket/useAdminSocket';
export default function InitAdminSocket() {
  useAdminSocket();
  return null;
}
