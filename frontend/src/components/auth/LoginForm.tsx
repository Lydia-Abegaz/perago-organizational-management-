import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack, Alert } from '@mantine/core';
import { IconAt, IconLock, IconLogin } from '@tabler/icons-react';
import { login, clearAuthError } from '../../store/authSlice';
import { RootState, AppDispatch } from '../../store';
import { useRouter } from 'next/navigation';

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder style={{ 
      backgroundColor: '#1e1e20',
      borderColor: '#3B3B3D',
      maxWidth: '450px',
      margin: '0 auto'
    }}>
      <Title order={2} ta="center" mt="md" mb={5} c="#FFFFFF">
        Welcome Back
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Enter your credentials to access the system
      </Text>

      {error && (
        <Alert color="red" mb="md" withCloseButton onClose={() => dispatch(clearAuthError())}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
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
            placeholder="Your password"
            leftSection={<IconLock size={16} />}
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
            styles={{ input: { backgroundColor: '#101014', borderColor: '#3B3B3D', color: '#FFF' } }}
          />

          <Button 
            type="submit" 
            fullWidth 
            mt="xl" 
            loading={loading}
            leftSection={<IconLogin size={18} />}
            bg="#00E8FF"
            c="#101014"
            style={{ fontWeight: 700 }}
          >
            Sign In
          </Button>
        </Stack>
      </form>

      <Text ta="center" mt="xl" size="sm" c="dimmed">
        Don't have an account?{' '}
        <Text component="span" c="#00E8FF" style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => router.push('/signup')}>
          Create account
        </Text>
      </Text>
    </Paper>
  );
};
