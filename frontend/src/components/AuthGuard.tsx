import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { RootState } from '../store';
import { LoadingOverlay, Box } from '@mantine/core';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading) {
      if (!isAuthenticated && !isPublicPath) {
        router.push('/login');
      } else if (isAuthenticated && isPublicPath) {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, isPublicPath, router, mounted]);

  // Show loading while not mounted or during auth loading
  if (!mounted || loading) {
    return (
      <Box style={{ height: '100vh', position: 'relative' }}>
        <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
      </Box>
    );
  }

  // If it's a private path and not authenticated, don't show children while redirecting
  if (!isAuthenticated && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
};
