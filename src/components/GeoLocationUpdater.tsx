'use client';
import { useEffect } from 'react';
import { connectWS } from '@/lib/socket';

export default function GeoLocationUpdater({ userId }: { userId: string }) {
  useEffect(() => {
    if (!userId) return;

    const socket = connectWS();
    socket.emit('identity', userId);

    if (!navigator.geolocation) return;

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        socket.emit('updateLocation', {
          userId,
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      },
      console.error,
      { enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [userId]);

  return null;
}
