import dynamic from 'next/dynamic';

const LiveMapTracking = dynamic(() => import('./LiveMapTracking.client'), {
  ssr: false,
});

export default LiveMapTracking;
