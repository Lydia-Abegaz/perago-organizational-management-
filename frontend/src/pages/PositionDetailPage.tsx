import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Title, Stack, LoadingOverlay, Alert } from '@mantine/core';
import { Layout } from '../components/Layout';
import { PositionForm } from '../components/PositionForm';
import { RootState, AppDispatch } from '../store';
import { 
  fetchPositionsTree, 
  fetchPositionById, 
  updatePosition, 
  clearCurrentPosition,
  clearError 
} from '../store/positionSlice';
import { UpdatePositionDto } from '../types/position';
import { notifications } from '@mantine/notifications';

export const PositionDetailPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { positions, currentPosition, loading, error } = useSelector((state: RootState) => state.positions);

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(fetchPositionById(id));
      dispatch(fetchPositionsTree());
    }

    return () => {
      dispatch(clearCurrentPosition());
    };
  }, [dispatch, id]);

  const handleSubmit = async (data: UpdatePositionDto) => {
    if (!currentPosition) return;
    
    try {
      await dispatch(updatePosition({ id: currentPosition.id, position: data })).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Position updated successfully',
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

  if (!id || typeof id !== 'string') {
    return (
      <Layout>
        <Alert color="gray" title="Invalid Position" variant="light">
          Invalid position ID provided.
        </Alert>
      </Layout>
    );
  }

  if (loading && !currentPosition) {
    return (
      <Layout>
        <div style={{ position: 'relative', minHeight: '200px' }}>
          <LoadingOverlay visible={true} overlayProps={{ blur: 2 }} />
        </div>
      </Layout>
    );
  }

  if (!currentPosition && !loading) {
    return (
      <Layout>
        <Alert color="gray" title="Position Not Found" variant="light">
          The requested position could not be found.
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack gap="xl">
        <Title order={1} c="#FFFFFF" style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
          Edit Position Details
        </Title>

        {error && (
          <Alert color="gray" title="Error" onClose={handleClearError} withCloseButton variant="light">
            {error}
          </Alert>
        )}

        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
          <PositionForm
            initialData={currentPosition || undefined}
            positions={positions}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEdit={true}
            loading={loading}
            error={error}
          />
        </div>
      </Stack>
    </Layout>
  );
};
