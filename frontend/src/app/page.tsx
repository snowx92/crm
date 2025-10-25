/**
 * Home Page
 *
 * This is the landing page that redirects users to login or dashboard
 * based on their authentication status.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
    </div>
  );
}
