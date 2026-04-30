'use client';

import { CreatePositionPage } from '../../pages/CreatePositionPage';
import { AuthGuard } from '../../components/AuthGuard';

export default function CreatePage() {
  return (
    <AuthGuard>
      <CreatePositionPage />
    </AuthGuard>
  );
}
