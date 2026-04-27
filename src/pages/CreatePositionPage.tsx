import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Title, Stack, LoadingOverlay } from '@mantine/core';
import { Layout } from '../components/Layout';
import { PositionForm } from '../components/PositionForm';
import { RootState, AppDispatch } from '../store';
import { fetchPositionsTree, createPosition, clearError } from '../store/positionSlice';
import { CreatePositionDto } from '../types/position';
import { notifications } from '@mantine/notifications';

export const CreatePositionPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { positions, loading, error } = useSelector((state: RootState) => state.positions);

  useEffect(() => {
    dispatch(fetchPositionsTree());
  }, [dispatch]);

  const handleSubmit = async (data: CreatePositionDto) => {
    try {
      await dispatch(createPosition(data)).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Position created successfully',
        color: 'brand',
      });
      router.push('/');
    } catch (error) {
      // Error is handled by Redux state
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Layout>
      <Stack gap="xl">
        <Title order={1} c="#FFFFFF" style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
          Create New Position
        </Title>

        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading && !positions.length} overlayProps={{ blur: 2 }} />
          <PositionForm
            positions={positions}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEdit={false}
            loading={loading}
            error={error}
          />
        </div>
      </Stack>
    </Layout>
  );
};
