'use client';

import { SignupForm } from '../../components/auth/SignupForm';
import { Center, Container } from '@mantine/core';

export default function SignupPage() {
  return (
    <Container size="xs" h="100vh">
      <Center h="100%">
        <SignupForm />
      </Center>
    </Container>
  );
}
