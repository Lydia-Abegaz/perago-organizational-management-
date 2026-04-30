import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Title, Group, Button, LoadingOverlay, Alert, Stack, Text } from '@mantine/core';
import { Layout } from '../components/Layout';
import { TreeView } from '../components/TreeView';
import { RootState, AppDispatch } from '../store';
import { fetchPositionsTree, deletePosition, clearError } from '../store/positionSlice';
import { modals } from '@mantine/modals';

export const HomePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { positions, loading, error } = useSelector((state: RootState) => state.positions);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    dispatch(fetchPositionsTree());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Delete Position',
      children: (
        <Text size="sm">
          Are you sure you want to delete this position? This action cannot be undone and will also delete all child positions.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'primary' },
      onConfirm: () => {
        dispatch(deletePosition(id));
      },
    });
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Layout>
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1} c="#FFFFFF" style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
            Employee Architecture
          </Title>
          {isAdmin && (
            <Button 
              onClick={() => router.push('/create')}
              bg="#00E8FF"
              c="#101014"
              size="md"
              radius="xl"
              style={{ 
                fontWeight: 800,
                boxShadow: '0 0 20px rgba(0, 232, 255, 0.3)',
                border: 'none',
                transition: 'all 0.2s ease'
              }}
              className="hover:scale-105 active:scale-95 hover:bg-[#26e4ff]"
              leftSection={<span style={{ fontSize: '20px' }}>+</span>}
            >
              New Position
            </Button>
          )}
        </Group>

        {error && (
          <Alert color="gray" title="Error" onClose={handleClearError} withCloseButton variant="light">
            {error}
          </Alert>
        )}

        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
          <TreeView positions={positions} onDelete={handleDelete} />
        </div>
      </Stack>
    </Layout>
  );
};
