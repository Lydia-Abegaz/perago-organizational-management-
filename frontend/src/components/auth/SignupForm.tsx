import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack, Alert, SimpleGrid, Select } from '@mantine/core';
import { IconAt, IconLock, IconUserPlus, IconUser, IconShieldCheck } from '@tabler/icons-react';
import { register as signup, clearAuthError } from '../../store/authSlice';
import { RootState, AppDispatch } from '../../store';
import { useRouter } from 'next/navigation';

export const SignupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: any) => {
    const result = await dispatch(signup(data));
    if (signup.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder style={{ 
      backgroundColor: '#1e1e20',
      borderColor: '#3B3B3D',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <Title order={2} ta="center" mt="md" mb={5} c="#FFFFFF">
        Create Account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Join the organizational management system
      </Text>

      {error && (
        <Alert color="red" mb="md" withCloseButton onClose={() => dispatch(clearAuthError())}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <SimpleGrid cols={2}>
            <TextInput
              required
              label="First Name"
              placeholder="John"
              leftSection={<IconUser size={16} />}
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName?.message}
              styles={{ input: { backgroundColor: '#101014', borderColor: '#3B3B3D', color: '#FFF' } }}
            />
            <TextInput
              required
              label="Last Name"
              placeholder="Doe"
              leftSection={<IconUser size={16} />}
              {...register('lastName', { required: 'Last name is required' })}
              error={errors.lastName?.message}
              styles={{ input: { backgroundColor: '#101014', borderColor: '#3B3B3D', color: '#FFF' } }}
            />
          </SimpleGrid>

          <TextInput
            required
            label="Email"
            placeholder="hello@perago.com"
            leftSection={<IconAt size={16} />}
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
            error={errors.email?.message}
            styles={{ input: { backgroundColor: '#101014', borderColor: '#3B3B3D', color: '#FFF' } }}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Create a strong password"
            leftSection={<IconLock size={16} />}
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            error={errors.password?.message}
            styles={{ input: { backgroundColor: '#101014', borderColor: '#3B3B3D', color: '#FFF' } }}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                label="Role"
                placeholder="Select your role"
                leftSection={<IconShieldCheck size={16} />}
                data={[
                  { value: 'user', label: 'Employee (User)' },
                  { value: 'admin', label: 'Administrator (Admin)' },
                ]}
                {...field}
                styles={{ 
                  input: { backgroundColor: '#101014', borderColor: '#3B3B3D', color: '#FFF' },
                  dropdown: { backgroundColor: '#1e1e20', borderColor: '#3B3B3D' },
                  option: { color: '#FFF' }
                }}
              />
            )}
          />

          <Button 
            type="submit" 
            fullWidth 
            mt="xl" 
            loading={loading}
            leftSection={<IconUserPlus size={18} />}
            bg="#00E8FF"
            c="#101014"
            style={{ fontWeight: 700 }}
          >
            Create Account
          </Button>
        </Stack>
      </form>

      <Text ta="center" mt="xl" size="sm" c="dimmed">
        Already have an account?{' '}
        <Text component="span" c="#00E8FF" style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => router.push('/login')}>
          Sign in
        </Text>
      </Text>
    </Paper>
  );
};
