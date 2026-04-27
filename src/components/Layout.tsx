import React from 'react';
import { AppShell, Group, Title, Anchor, Text } from '@mantine/core';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell
      header={{ height: 70 }}
      padding="xl"
    >
      <AppShell.Header 
        bg="#284B63" 
        style={{ 
          borderBottom: '2px solid #1A3A4A', 
          boxShadow: '0 4px 12px rgba(40, 75, 99, 0.3)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Group h="100%" px="xl" justify="space-between" style={{ width: '100%' }}>
          <Group gap="xl">
            <Title order={3} c="#FFFFFF" style={{ letterSpacing: '1px', textTransform: 'uppercase', fontSize: '18px', fontWeight: 800 }}>
              Perago <span style={{ color: '#00E8FF' }}>System</span>
            </Title>
          </Group>
          <Group gap="md">
            <Anchor component={Link} href="/" size="xs" c="#FFFFFF" fw={800} style={{ textDecoration: 'none', letterSpacing: '1px' }}>
              DASHBOARD
            </Anchor>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#FFFFFF' }} />
            <Text size="xs" c="#00E8FF" fw={700}>v2.0</Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main bg="#403D39">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
