'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const token = searchParams.get('token') || '';

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await axios.post('/api/user/verifyemail', { token });
        setVerified(true);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="bg-orange-500 p-2 text-black">
        {token ? `${token}` : 'no token'}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="bg-red-500 text-2xl text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
