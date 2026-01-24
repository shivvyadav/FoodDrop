import dynamic from 'next/dynamic';
import { memo } from 'react';

const LiveMapTracking = dynamic(() => import('./LiveMapTracking.client'), {
  ssr: false,
});

export default memo(LiveMapTracking);
