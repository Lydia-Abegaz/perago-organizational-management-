import React from 'react';
import { AppShell, Group, Title, Button, Text, Avatar, Menu, UnstyledButton } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState, AppDispatch } from '../store';
import { useRouter } from 'next/navigation';
import { IconLogout, IconUser, IconChevronDown } from '@tabler/icons-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <AppShell
      header={{ height: 70 }}
      padding="xl"
      styles={{
        main: {
          backgroundColor: 'transparent', // Uses the background from RootLayout
        }
      }}
    >
      <AppShell.Header 
        bg="rgba(16, 16, 20, 0.8)" 
        style={{ 
          borderBottom: '1px solid #3B3B3D', 
          backdropFilter: 'blur(10px)',
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
            {user && (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <UnstyledButton 
                    className="user-menu-button"
                    style={{ 
                      padding: '4px 8px', 
                      borderRadius: '8px', 
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <Group gap="sm">
                      <Avatar color="cyan" radius="xl" size="sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={700} c="#FFF">
                          {user.firstName} {user.lastName}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {user.role}
                        </Text>
                      </div>
                      <IconChevronDown size={14} color="#616165" />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown bg="#1e1e20" style={{ borderColor: '#3B3B3D' }}>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item leftSection={<IconUser size={14} />} c="#FFF">
                    Profile
                  </Menu.Item>
                  <Menu.Divider style={{ borderColor: '#3B3B3D' }} />
                  <Menu.Item 
                    color="red" 
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
