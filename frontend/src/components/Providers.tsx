'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { store, AppDispatch } from '../store';
import { initializeAuth } from '../store/authSlice';

const theme = createTheme({
  primaryColor: 'cyan',
  defaultRadius: 'xl',
  black: '#101014',
  white: '#FFFFFF',
  colors: {
    cyan: [
      '#e0fbff',
      '#b3f5ff',
      '#80efff',
      '#4de9ff',
      '#26e4ff',
      '#00E8FF', // Primary Neon Cyan (Index 5)
      '#00b9cc',
      '#008b99',
      '#005d66',
      '#002e33',
    ],
    violet: [
      '#f3e0ff',
      '#dfb3ff',
      '#c980ff',
      '#b24dff',
      '#a026ff',
      '#8A00FF', // Secondary Violet (Index 5)
      '#6e00cc',
      '#530099',
      '#370066',
      '#1c0033',
    ],
    dark: [
      '#d7d7d8',
      '#b0b0b2',
      '#88888b',
      '#616165',
      '#3B3B3D', // Borders (Index 4)
      '#28282a',
      '#1e1e20',
      '#151517',
      '#101014', // Core Background (Index 8)
      '#08080a',
    ]
  },
  components: {
    Title: {
      styles: {
        root: {
          fontWeight: 800,
          letterSpacing: '-1px',
          color: '#FFFFFF',
        },
      },
    },
    Button: {
      styles: (theme) => ({
        root: {
          transition: 'all 0.3s ease',
          backgroundColor: '#00E8FF',
          color: '#101014',
          fontWeight: 700,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 20px rgba(0, 232, 255, 0.4)',
            backgroundColor: '#26e4ff',
          },
        },
      }),
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: '#1e1e20',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
  },
});

function StoreInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreInitializer />
      <MantineProvider theme={theme}>
        <div style={{ 
          backgroundColor: '#101014', 
          minHeight: '100vh', 
          color: '#FFFFFF',
          backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(0, 232, 255, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(138, 0, 255, 0.08), transparent 25%)'
        }}>
          <ModalsProvider>
            <Notifications position="top-right" />
            {children}
          </ModalsProvider>
        </div>
      </MantineProvider>
    </Provider>
  );
}
