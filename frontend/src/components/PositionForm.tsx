import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Paper,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Stack,
  LoadingOverlay,
  Alert,
} from '@mantine/core';
import { Position, CreatePositionDto, UpdatePositionDto } from '../types/position';
import { flattenTree, getDescendantIds } from '../utils/treeHelpers';

const positionSchema = yup.object().shape({
  name: yup.string().required('Position name is required').min(2, 'Name must be at least 2 characters'),
  description: yup.string().optional(),
  parentId: yup.number().nullable().optional(),
});

interface PositionFormProps {
  initialData?: Position;
  positions: Position[];
  onSubmit: (data: CreatePositionDto | UpdatePositionDto) => void;
  onCancel: () => void;
  isEdit?: boolean;
  loading?: boolean;
  error?: string | null;
}

type FormData = {
  name: string;
  description?: string;
  parentId?: number | null;
};

export const PositionForm: React.FC<PositionFormProps> = ({
  initialData,
  positions,
  onSubmit,
  onCancel,
  isEdit = false,
  loading = false,
  error = null,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(positionSchema),
    defaultValues: {
      name: '',
      description: '',
      parentId: null,
    },
  });

  const parentId = watch('parentId');

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || '',
        parentId: initialData.parentId,
      });
    }
  }, [initialData, reset]);

  const flatPositions = flattenTree(positions);
  
  // Filter out current position and its descendants when editing to prevent circular references
  const availableParents = isEdit && initialData
    ? flatPositions.filter(
        pos => pos.id !== initialData.id && !getDescendantIds(initialData).includes(pos.id)
      )
    : flatPositions;

  const parentOptions = [
    { value: '', label: 'No Parent (CEO)', disabled: false },
    ...availableParents.map((position) => ({
      value: position.id.toString(),
      label: position.displayName,
      disabled: false,
    })),
  ];

  const onFormSubmit = (data: FormData) => {
    const submitData = {
      ...data,
      parentId: data.parentId === '' ? null : (data.parentId || null),
    };
    onSubmit(submitData);
  };

  return (
    <Paper shadow="md" p="xl" radius="xl" pos="relative" bg="#F4F3EE" style={{ border: '2px solid #D4D0C4', boxShadow: '0 4px 20px rgba(244, 243, 238, 0.5)' }}>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack gap="md">
          {error && (
            <Alert color="dark" title="Error" variant="light">
              {error}
            </Alert>
          )}

          <TextInput
            label="Position Name"
            placeholder="Enter position name"
            required
            error={errors.name?.message}
            {...register('name')}
            styles={{
              input: {
                backgroundColor: '#FFFFFF',
                borderColor: '#284B63',
                color: '#333333'
              },
              label: {
                color: '#333333'
              }
            }}
          />

          <Textarea
            label="Description"
            placeholder="Enter position description (optional)"
            minRows={3}
            error={errors.description?.message}
            {...register('description')}
            styles={{
              input: {
                backgroundColor: '#FFFFFF',
                borderColor: '#284B63',
                color: '#333333'
              },
              label: {
                color: '#333333'
              }
            }}
          />

          <Select
            label="Parent Position"
            placeholder="Select parent position"
            data={parentOptions}
            value={parentId?.toString() || ''}
            onChange={(value) => setValue('parentId', value === '' ? null : Number(value))}
            error={errors.parentId?.message}
            clearable
            searchable
            styles={{
              input: {
                backgroundColor: '#FFFFFF',
                borderColor: '#284B63',
                color: '#333333'
              },
              label: {
                color: '#333333'
              }
            }}
          />

          <Group justify="flex-end" mt="md">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              disabled={loading}
              c="accent"
              style={{ 
                borderColor: '#A38D6C',
                borderRadius: '10px',
                fontWeight: 500
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={loading}
              bg="#284B63"
              c="white"
              style={{ 
                borderRadius: '10px',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(40, 75, 99, 0.3)'
              }}
            >
              {isEdit ? 'Update Position' : 'Create Position'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
