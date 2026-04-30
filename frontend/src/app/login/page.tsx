'use client';

import { LoginForm } from '../../components/auth/LoginForm';
import { Center, Container } from '@mantine/core';

export default function LoginPage() {
  return (
    <Container size="xs" h="100vh">
      <Center h="100%">
        <LoginForm />
      </Center>
    </Container>
  );
}
