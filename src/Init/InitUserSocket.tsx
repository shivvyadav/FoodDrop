'use client';

import useUserSocket from '@/hooks/socket/useUserSocket';
export default function InitUserSocket() {
  useUserSocket();
  return null;
}
